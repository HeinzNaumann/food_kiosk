import axios from 'axios'
import { useState, useEffect, createContext } from 'react'
import { toast } from 'react-toastify'

const QuiscoContext = createContext()


const QuiscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const obtenerCategorias = async () => {

        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])


    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({ categoriaId, image, ...producto }) => {
        if (pedido.some(productostate => productostate.id === producto.id)) {
            //Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            console.log(pedidoActualizado)
            toast.success('Guardado correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }
        setModal(false)

    }
    return (
        <QuiscoContext.Provider value={{ categorias, categoriaActual, handleClickCategoria, producto, handleSetProducto, modal, handleChangeModal, handleAgregarPedido, pedido }}>
            {children}


        </QuiscoContext.Provider >
    )
}

export { QuiscoProvider }

export default QuiscoContext