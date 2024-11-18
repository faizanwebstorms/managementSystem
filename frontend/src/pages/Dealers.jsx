// DealersTable.js
import { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
// import { sampleDealers } from "../constants/arrays";
import AddDealer from "../modals/addDealer";
import { useDispatch, useSelector } from "react-redux";
import {
  adddealerRequest,
  dealersRequest,
  deletedealerRequest,
} from "../redux/actions/dealers";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Dealers = () => {
  // Pagination state
  // const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const [toggle, setToggle] = useState(false);
  const dealersData = useSelector((state) => state.dealers.dealers);
  const dealerData = useSelector((state) => state.dealers.dealer);
  const loading = useSelector((state) => state.dealers.loading);
  const authToken = localStorage.getItem("authToken");
  // const [dealers, setDealers] = useState(sampleDealers);
  const [showModal, setShowModal] = useState(false);
  // const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  // Handle page change
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const handlePageChange = (pageNumber) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageNumber,
    }));
  };

  console.log("dealersData", dealersData);

  // Handle modal close
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // const filteredDealers = dealers.filter(
  //   (dealer) =>
  //     dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     dealer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     dealer.contact.includes(searchTerm)
  // );

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  //   setCurrentPage(1); // Reset to the first page on a new search
  // };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPagination({ pageNumber: 1, pageSize: pagination.pageSize }); // Reset to the first page on a new search
  };

  const handleAddDealer = (values, { resetForm }) => {
    const data = {
      firstName: values?.name,
      email: values?.email,
      password: values?.password,
      paymentRangeMin: 0,
      paymentRangeMax: Number(values.limit),
    };
    dispatch(
      adddealerRequest(
        data,
        authToken,
        () => {
          toast.success("Dealer added successfully");
          resetForm();
          handleCloseModal();
          setToggle(true);
          // dealersRequest(
          //   pagination?.pageNumber,
          //   pagination?.pageSize,
          //   authToken
          // );
        },
        () => {
          console.log("error");
        }
      )
    );
    // setDealers((prevDealers) => {
    //   const newDealer = {
    //     id:
    //       prevDealers.length > 0
    //         ? prevDealers[prevDealers.length - 1].id + 1
    //         : 1,
    //     name: values.name,
    //     email: values.email,
    //     limit: values.limit,
    //   };
    //   return [...prevDealers, newDealer];
    // });
  };

  const deleteDealer = async (id) => {
    await dispatch(
      deletedealerRequest(
        id,
        authToken,
        async () => {
          toast.success("Dealer deleted successfully");
          await dealersRequest(
            pagination?.pageNumber,
            pagination?.pageSize,
            authToken
          );
        },
        () => {
          toast.error("something went wrong");
        }
      )
    );
  };

  // Handle form submission for adding a new dealer

  // Calculate total pages
  // const totalPages = Math.ceil(filteredDealers.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredDealers.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(
      dealersRequest(
        pagination?.pageNumber,
        pagination?.pageSize,
        authToken,
        () => {},
        () => {}
      )
    );
  }, [dispatch, pagination, authToken]);

  useEffect(() => {
    if (dealerData && toggle) {
      dispatch(
        dealersRequest(pagination?.pageNumber, pagination?.pageSize, authToken)
      );
    }
  }, [dispatch, dealerData, toggle, pagination, authToken]);

  return (
    <>
      <AddDealer
        show={showModal}
        handleClose={handleCloseModal}
        handleAddDealer={handleAddDealer}
      />
      <div className="d-flex justify-content-between w-100 mb-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
        />
        <Button onClick={handleShowModal}>Add Dealer</Button>
      </div>

      {loading ? (
        <PulseLoader />
      ) : (
        <div className="w-100 table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Limit</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dealersData?.data?.docs?.map((dealer) => (
                <tr key={dealer.id}>
                  <td>{dealer.userId}</td>
                  <td>{dealer.name || "Dealer name"}</td>
                  <td>{dealer.user?.email}</td>
                  <td>{dealer?.payment_range_max}</td>
                  <td className="text-center">
                    <MdDelete
                      color="red"
                      fontSize={16}
                      cursor={"pointer"}
                      onClick={() => deleteDealer(dealer?._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {[...Array(dealersData?.data?.totalPages || 1).keys()].map(
              (page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === pagination.pageNumber}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
      )}
    </>
  );
};

export default Dealers;
