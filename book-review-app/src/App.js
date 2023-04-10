import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import { BookProvider } from './contexts/bookContext';

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Logout } from './components/Logout/Logout';
import { Register } from "./components/Register/Register";
import { Catalog } from "./components/Catalog/Catalog";
import { CreateBook } from "./components/CreateBook/CreateBook";
import { BookDetails } from './components/BookDetails/BookDetails';
import { EditGame } from './components/EditBook/EditBook';
import { RouteGuard } from './components/common/RouteGuard';
import { BookOwnership } from './components/common/BookOwnership';

function App() {
    return (
        <AuthProvider>
            <BookProvider>
             
                    <Header />
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/catalog/:bookId' element={<BookDetails />} />

                            {/* RouteGuard working with <Outlet /> */}
                            <Route element={<RouteGuard />}>
                                <Route path='/catalog/:bookId/edit' element={
                                    <BookOwnership>
                                        <EditGame />
                                    </BookOwnership>
                                } />
                                <Route path='/create-review' element={<CreateBook />} />
                                <Route path='/logout' element={<Logout />} />
                            </Route>                      
                        </Routes>
                    </main>
                    <Footer />
              
            </BookProvider>
        </AuthProvider>
    );
}

export default App;