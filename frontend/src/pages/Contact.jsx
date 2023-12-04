import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import AddContact from "../components/AddContact";

let URL = `http://localhost:4500/contacts`;

export default function Contact() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { users } = useSelector((store) => store.userReducer);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [label, setLabel] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  // console.log(users);

  async function getUsers() {
    try {
      let res = await axios.get(`${URL}`);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  async function patchUser(id) {
    // console.log(`patch`, id);
    try {
      let paramObj = {
        name,
        email,
        phone,
        label,
      };
      // console.log("patch", paramObj);
      let res = await axios.patch(`${URL}/${id}`, paramObj);
      setUsers(res.data.users);
      setEmail("");
      setName("");
      setLabel("");
      setPhone("");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id) {
    try {
      let res = await axios.delete(`${URL}/${id}`);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  function handleDelete(id) {
    deleteUser(id);
  }

  // function handleEdit(item) {
  //   setName(item.name);
  //   setPhone(item.phone);
  //   setEmail(item.email);
  //   setLabel(item.label);
  //   onOpen();
  // }

  function handleSubmit() {
    patchUser(selectedItem._id);
  }

  function openModal(item) {
    setSelectedItem(item);
    setName(item.name);
    setPhone(item.phone);
    setEmail(item.email);
    setLabel(item.label);
    onOpen();
  }

  return (
    <>
      <Heading>Contact Page</Heading>
      <AddContact
        name={name}
        email={email}
        label={label}
        phone={phone}
        setEmail={setEmail}
        setLabel={setLabel}
        setName={setName}
        setPhone={setPhone}
        setUsers={setUsers}
      />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Label</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.length > 0 &&
              users.map((item) => {
                return (
                  <>
                    <Tr key={item._id}>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.phone}</Td>
                      <Td>{item.label}</Td>
                      <Td>
                        <Button onClick={() => openModal(item)}>Edit</Button>
                        <Button onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  </>
                );
              })}
          </Tbody>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Contact</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Input
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <Select
                  placeholder="Select option"
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
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
                <Button
                  variant="ghost"
                  onClick={() => handleSubmit(selectedItem._id)}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Table>
      </TableContainer>
    </>
  );
}
