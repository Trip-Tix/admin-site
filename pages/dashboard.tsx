import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import { NavigationOption } from "@public/common/navigation_option";
import { useState, useEffect } from "react";
import { adminInfo } from "@public/common/admin_interface";
import {
  VStack,
  Heading,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Button,
} from "@chakra-ui/react";
import { fetchAllAdminToList, setAdminStatus } from "@public/common/admin_api";

export default function Main() {
  const [adminRole, setAdminRole] = useState(null);
  const [AdminInfoLoading, setAdminInfoLoading] = useState(true);
  const [admins, setAdmins] = useState<adminInfo[]>([{
    adminId: 0,
    adminRoleName: "",
    companyName: "",
    status: 0,
    username: "",
    adminName: "",
    email: "",
  }]);

  useEffect(() => {
    const role = sessionStorage.getItem("user-role");
    setAdminRole(role);
    fetchAllAdminToList().then((res) => {
        setAdmins(res);
        setAdminInfoLoading(false);
        });
  }, []);

  async function handleStatusChange(admin: adminInfo, status: number) {
    try {
        setAdminInfoLoading(true);
        const message = await setAdminStatus({
            admin_id: admin.adminId,
            admin_role_name: admin.adminRoleName,
            company_name: admin.companyName,
            status: status,
        });
        setAdmins(prevAdmins => {
            return prevAdmins.map(currAdmin => {
                if (currAdmin.adminId === admin.adminId) {
                    return { ...currAdmin, status: status };
                }
                return currAdmin;
            });
          });

        setAdminInfoLoading(false);

        console.log(message);

    } catch (error) {
        console.error("Error updating admin status:", error);
    }
  }
  return (
    <Layout title="Dashboard" isProtected={true}>
      {adminRole === "ADMIN" && (
        <SidebarWithHeader navItem={NavigationOption.Home}>
          <VStack spacing={4} align="stretch" flex={1} ml={10} mr={10}>
            <Heading as="h1" size="lg" color="primary.800">
              List of Admins
            </Heading>
            {AdminInfoLoading ? (
              <>
                <Heading as="h2" size="md" color="primary.800">
                  Loading...
                </Heading>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </>
            ) : (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Company Name</Th>
                      <Th>Admin Full Name</Th>
                      <Th>Username</Th>
                      <Th>Admin Role</Th>
                      <Th>Email</Th>
                      <Th textAlign="center">Status</Th>
                      <Th textAlign="center">Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {admins.map((admin, index) => (
                      <Tr key={index} onClick={() => {}} cursor={"pointer"}>
                        <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{admin.companyName}</Td>
                        <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{admin.adminName}</Td>
                        <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{admin.username}</Td>
                        <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{admin.adminRoleName}</Td>
                        <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{admin.email}</Td>
                        <Td style={{ width: "10%", paddingTop: '10px', paddingBottom: '10px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                          {admin.status === 1 ? (
                            <Tag size="lg" width="100%" borderRadius="md" variant="solid" colorScheme="green" display="flex" justifyContent="center" alignItems="center">
                              Approved
                            </Tag>
                          ) : (
                            <Tag size="lg" width="100%" borderRadius="md" variant="solid" colorScheme="red" display="flex" justifyContent="center" alignItems="center">
                              Need Approval
                            </Tag>
                          )}
                        </Td>
                        <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                          {admin.status === 1 ? (
                            <></>
                          ) : (
                            <Button style={{ height: '35px', width: '100%' }} colorScheme="green" onClick={() => handleStatusChange(admin, 1)}>
                              Approve Admin
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </VStack>
        </SidebarWithHeader>
      )}
    </Layout>
  );  
}