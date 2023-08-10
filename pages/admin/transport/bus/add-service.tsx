// import React, { useState } from "react";
// import {
//   Flex,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "@chakra-ui/react";
// import { GetStaticProps } from "next";
// import Layout from "@components/layout";
// import BusServiceCard from "@components/bus_service_add_card";
// import Navbar from "@components/shared/navbar";
// import TransportOptionBar from "@components/transport_option_bar";
// import { transport_optionbar_items } from "@public/commonData/TransportOptionBarData";
// import Footer from "@components/shared/footer";
// interface Coach {
//   coach_id: string;
//   coach_name: string;
// }

// interface AddBusServicePageProps {
//   coaches: Coach[];
// }

// const AddBusServicePage: React.FC<AddBusServicePageProps> = ({ coaches }) => {
//   const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

//   const handleAddBusService = async (serviceInfo: any) => {
//     try {
//       // Make API request to add bus service
//       const response = await fetch(add_bus_info_url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           busName: serviceInfo.serviceName,
//           numberOfBus: serviceInfo.numberOfBuses,
//           coachInfo: serviceInfo.selectedCoaches,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setIsSuccessPopupOpen(true);
//         // Reset form fields
//         serviceInfo.serviceName = "";
//         serviceInfo.numberOfBuses = 0;
//         serviceInfo.selectedCoaches = [];
//       } else {
//         console.error("Error adding bus service:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error adding bus service:", error);
//     }
//   };

//   const handleCloseSuccessPopup = () => {
//     setIsSuccessPopupOpen(false);
//   };

//   return (
//     <Layout title="Add Bus Service" protectedPage={false}>
//       <Navbar selected_option={navbar_items[0]} />
//       <TransportOptionBar selectedOption={transport_optionbar_items[2]} />

//       <Flex justify="center" align="center" minHeight="80vh">
//         <BusServiceCard coaches={coaches} onSubmit={handleAddBusService} />
//       </Flex>

//       <Modal isOpen={isSuccessPopupOpen} onClose={handleCloseSuccessPopup}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Success</ModalHeader>
//           <ModalBody>Bus service added successfully!</ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" onClick={handleCloseSuccessPopup}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//       <Footer />
//     </Layout>
//   );
// };

// // Fetch coach information from API
// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const response = await fetch(get_coach_info_url);
//     const coachesData = await response.json();

//     const coaches: Coach[] = coachesData; // Use the parsed JSON directly, no need for JSON.parse

//     return {
//       props: { coaches },
//     };
//   } catch (error) {
//     console.error("Error fetching coach information:", error);
//     return {
//       props: { coaches: [] },
//     };
//   }
// };

// export default AddBusServicePage;

export default function AddBusService() {
  return (
    <div>
      <h1>Add Bus Service</h1>
    </div>
  );
}