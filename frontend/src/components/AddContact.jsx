import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

let URL = `http://localhost:4500/contacts`;

export default function AddContact({
  email,
  label,
  name,
  phone,
  setEmail,
  setLabel,
  setName,
  setPhone,
  setUsers,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function postUser() {
    try {
      let paramObj = {
        name,
        email,
        phone,
        label,
      };
      // console.log(paramObj);
      let res = await axios.post(`${URL}`, paramObj);
      setUsers(res.data.users);
      setEmail("");
      setName("");
      setLabel("");
      setPhone("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    postUser();
  }

  return (
    <>
      <Button onClick={onOpen}>Add Contact</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Select
              placeholder="Select option"
              onChange={(e) => setLabel(e.target.value)}
            >
              <option value="work">work</option>
              <option value="school">school</option>
              <option value="friends">friends</option>
              <option value="family">family</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleClick}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
