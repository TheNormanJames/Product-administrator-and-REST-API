import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, {
  action as updateAvailabilityAction,
  loader as productsLoader,
} from './views/Products';
import NewProduct, { action as newProductAction } from './views/NewProduct';
import EditProduct, {
  action as editProductAction,
  loader as editProductLoader,
} from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        hydrateFallbackElement: <p>Cargando...</p>,
        action: updateAvailabilityAction,
      },
      {
        path: 'productos/nuevo',
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: 'productos/:id/editar', //ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: 'productos/:id/eliminar', //ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        action: deleteProductAction,
      },
    ],
  },
]);
