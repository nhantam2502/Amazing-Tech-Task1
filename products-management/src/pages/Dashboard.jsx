import TableDashBoard from "../components/Table";
import useProductList from "../hooks/useProductList";
import ModalAdd from "../components/ModalAdd";

const Dashboard = () => {
  const productList = useProductList();

  return (
    <div>
      <ModalAdd/>
      <TableDashBoard dataSource={productList} />
    </div>
  )
}

export default Dashboard;