import {useCallback, useMemo} from "react";
import {ListTable, TableHeader} from "../../../../components/list/list-table";
import {List} from "../../../../components/list";
import {GetCustomerResponse, useGetCustomers} from "../../queries/use-get-customers";
import { useDeleteCustomer } from "../../mutations/use-delete-customer";
import {ListHeader} from "../../../../components/list/list-header";
import {Link} from "react-router-dom";
import {useFlash} from "../../../../contexts/useFlash";
import {useError} from "../../../../hooks/useError";
import {ListAction} from "../../../../components/list/list-action";

function ListCustomer() {
    const flash = useFlash()
    const error = useError()

    const getCustomers = useGetCustomers()
    const deleteCustomer = useDeleteCustomer()

    const handleDeleteCustomer = useCallback(async (id: string) => {
        try {
            await deleteCustomer.mutateAsync({ customerId: id })
            flash.onOpen({title: "Cliente removido com sucesso.", variant: "success"})
        } catch (e) {
            error.handle(e)
            console.error(e)
        }
    }, [])

    const headers = useMemo(() => {
        return [
            {
                label: 'Nome',
                accessor: 'name',
            },
            {
                label: 'Pontos',
                accessor: 'rewardPoints',
            },
            {
                label: 'Telefone',
                accessor: 'phoneNumber'
            },
            {
                label: '',
                isAction: true,
                fn(_, data) {
                    return (
                        <ListAction>
                            <Link to={`/customers/${data.id}`}>
                                <ListAction.Details />
                            </Link>
                            <ListAction.Delete onConfirm={() => handleDeleteCustomer(data.id)} />
                            {/*<IconButton*/}
                            {/*    onClick={() => handleDeleteCustomer(data.id)}*/}
                            {/*    aria-label="Trash"*/}
                            {/*    icon={FiTrash2}*/}
                            {/*    sx={{*/}
                            {/*        width: 32,*/}
                            {/*        height: 32,*/}
                            {/*        span: {*/}
                            {/*            display: 'flex',*/}
                            {/*            alignItems: 'center',*/}
                            {/*            justifyContent: 'center',*/}
                            {/*        },*/}
                            {/*        ':hover': {*/}
                            {/*            filter: 'brightness(0.95)',*/}
                            {/*        },*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </ListAction>
                    )
                }
            }
        ] as TableHeader<GetCustomerResponse>[]
    }, [])

    return (
        <List>
            <ListHeader title={"Clientes"} buttonHref={"/customers/create"} buttonTitle={"+ Criar cliente"} />

            <ListTable headers={headers} data={getCustomers.data} />
        </List>
    )
}

export { ListCustomer }