// React Imports
import { useNavigate } from "react-router-dom";
// Utils
import {
  convertToAMPMFormat,
  maskingPhoneNumber,
  thousandSeparatorNumber,
} from "../../utils";
// React Icons
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

// MUI Imports
import { Box, Grid, Divider } from "@mui/material";
// Custom Imports
import { Heading } from "../../components/Heading";
import Navbar from "../../components/Navbar";
import { useGetApprovedDoctorsQuery } from "../../redux/api/doctorSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetApprovedDoctorsQuery({});

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Box sx={{
        
        // height: "100vh",
        // width: "100vw",
        // padding: "24px",
        // boxSizing: "border-box",

      }}>
        <Navbar>
          <Heading>Available Doctors</Heading>
          {data?.data?.length !== 0 && (
            <Heading sx={{ margin: "10px 0", fontSize: "14px", fontWeight: 500 }}>
              Select Doctor to add Appointments
            </Heading>
          )}

          <Box>
            <Grid container rowSpacing={2} columnSpacing={4}>
              {data?.data?.length === 0 ? (
                <Box
                  sx={{
                    margin: "30px 0 20px 0",
                    background: "#fff",
                    borderRadius: "6px",
                    padding: "15px 20px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                  }}
                >
                  No Doctors Available in this Clinic
                </Box>
              ) : (
                <>

                  {data?.data?.map((row: any) => {
                    return (
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            margin: "20px 0",
                            background: "#fff",
                            borderRadius: "6px",
                            padding: "15px 20px",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                            cursor: "pointer",
                            "&:hover": {
                              border: "2px solid #b6ecff",
                            },
                          }}
                          onClick={() => {
                            navigate(`/book-appointments/${row?.userId}`);
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <CgProfile style={{ color: "#0095c8", width: "35px", height: "35px", padding: "5px" }} />
                            <Heading
                              sx={{
                                margin: "5px 0",
                                fontSize: "18px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {`${row?.prefix} ${row?.fullName}`}
                              <Box sx={{
                                color: "#0095c8",
                                fontSize: "12px",
                                // marginBottom: "24px",

                                display: "inline-block",
                                padding: "5px 12px",
                                backgroundColor: "#b6ecff",
                                borderRadius: "16px",
                              }}>
                                {`${row?.specialization}`}
                              </Box>
                            </Heading>
                          </Box>
                          <Divider />
                          <Box
                            sx={{
                              margin: "15px 0 10px 0",
                              display: "flex",
                              alignItems: "center",


                            }}
                          >
                            <Box
                              sx={{
                                minWidth: "180px",
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              <IoPhonePortraitOutline style={{ color: "#0095c8", width: "20px", height: "20px" }} />
                              Phone Number
                            </Box>
                            <Box  >{maskingPhoneNumber(row?.phoneNumber)}</Box>
                          </Box>
                          <Box
                            sx={{
                              margin: "15px 0 10px 0",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: "180px",
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              <CiLocationOn style={{ color: "#0095c8", width: "20px", height: "20px" }} />
                              Address
                            </Box>
                            <Box>{row?.address}</Box>
                          </Box>
                          <Box
                            sx={{
                              margin: "15px 0 10px 0",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: "180px",
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              <CiMoneyCheck1 style={{ color: "#0095c8", width: "20px", height: "20px" }} /> Fee Per Visit
                            </Box>
                            <Box>
                              {thousandSeparatorNumber(row?.feePerConsultation)}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              margin: "15px 0 10px 0",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: "180px",
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              <IoMdTime style={{ color: "#0095c8", width: "20px", height: "20px" }} />
                              Timings
                            </Box>
                            <Box>{`${convertToAMPMFormat(
                              row?.fromTime
                            )} to ${convertToAMPMFormat(row?.toTime)}`}</Box>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}

                </>
              )}
            </Grid>
          </Box>
        </Navbar >
      </Box >
    </>
  );
};

export default Dashboard;
