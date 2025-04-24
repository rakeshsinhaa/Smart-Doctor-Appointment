// Hooks
import useTypedSelector from "../../../hooks/useTypedSelector";
// Redux
import { useGetUserQuery } from "../../../redux/api/userSlice";
import {
  selectedUserId,
  userIsAdmin,
  userIsDoctor,
} from "../../../redux/auth/authSlice";
// Utils
import {
  formatDateTime,
  getNameInitials,
  maskingPhoneNumber,
} from "../../../utils";
// MUI Imports
import { Box, Avatar } from "@mui/material";
// Custom Imports
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import Navbar from "../../../components/Navbar";
import { Heading } from "../../../components/Heading";

const UserProfile = () => {
  const userId = useTypedSelector(selectedUserId);
  const isDoctor = useTypedSelector(userIsDoctor);
  const isAdmin = useTypedSelector(userIsAdmin);

  const { data, isLoading } = useGetUserQuery({
    userId,
  });

  return (
    <>
      {isLoading && <OverlayLoader />}

      <Box sx={{
        background: "#EAF6FF",
        width: "100%",
        height: "100%"
      }}>
        <Navbar>

          <Heading>Profile Details</Heading>
          <Box
            sx={{
              margin: "20px 0",
              background: "#fff",
              borderRadius: "6px",
              padding: "15px 20px",
              maxWidth: '1400px',
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",

            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

              }}
            >
              {/* <Box sx={{ fontSize: "14px", fontWeight: 500 }}>
              {isDoctor ? "Doctor" : isAdmin ? "Owner" : "User"}
            </Box> */}
              {isAdmin && (
                <Box
                  sx={{
                    background: "#0078a5",
                    fontSize: "12px",
                    color: "#fff",
                    borderRadius: "15px",
                    padding: "5px 10px",
                  }}
                >
                  Admin
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                marginBottom: '32px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Avatar sx={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                backgroundColor: '#C3EAFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                //  marginRight: '24px',
                color: '#2c3e50',
                fontSize: '36px',
                fontWeight: '600',
              }}>
                {getNameInitials(data?.data?.name)}
              </Avatar>
            </Box>
            <Heading
              sx={{
                fontSize: '28px',
                fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
                fontWeight: '500',
                color: '#2c3e50',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'

              }}
            >
              {data?.data?.name}
            </Heading>
            <Box
              sx={{
                color: '#4A5568',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: '2px'
              }}
            >
              <Box sx={{ paddingRight: '5px' }}>Phone Number: </Box>
              <Box sx={{ color: 'black' }}>{maskingPhoneNumber(data?.data?.phoneNumber)}</Box>
            </Box>

            <Box
              sx={{

                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4A5568'
              }}
            >
              <Box sx={{ paddingRight: '5px' }}>Created At: </Box>
              <Box sx={{ color: 'black' }}>{formatDateTime(data?.data?.createdAt)}</Box>
            </Box>
          </Box>
        </Navbar>
      </Box>
    </>
  );
};

export default UserProfile;
