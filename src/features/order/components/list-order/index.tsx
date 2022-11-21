import { useMemo } from "react";
import { ListTable, TableHeader } from "../../../../components/list/list-table";
import { List } from "../../../../components/list";
import { ListHeader } from "../../../../components/list/list-header";
import { useFlash } from "../../../../contexts/useFlash";
import { useError } from "../../../../hooks/use-error";
import { GetOrderResponse, useGetOrders } from "../../queries/use-get-orders";
import { formatCurrency } from "@utils/format-currency";
import { ListAction } from "@components/list/list-action";
import { Link } from "react-router-dom";

function ListOrder() {
  const flash = useFlash();
  const error = useError();

  const getOrders = useGetOrders();

  const headers = useMemo(() => {
    return [
      {
        label: "Status",
        accessor: "orderStatus",
      },
      {
        label: "Valor total",
        accessor: "total",
        fn(value) {
          return formatCurrency(value);
        },
      },
      {
        label: "",
        isAction: true,
        fn(_, data) {
          return (
            <ListAction>
              <Link to={`/customers/${data.id}`}>
                <ListAction.Details />
              </Link>
              <ListAction.Delete
                onConfirm={() => handleDeleteCustomer(data.id)}
              />
            </ListAction>
          );
        },
      },
    ] as TableHeader<GetOrderResponse>[];
  }, []);

  return (
    <List>
      <ListHeader title={"Pedidos"} />

      <ListTable
        testId={"table-orders"}
        headers={headers}
        data={getOrders.data}
      />
    </List>
  );
}

export { ListOrder };
