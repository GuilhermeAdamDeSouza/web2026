import { Outlet, NavLink } from 'react-router-dom';

function Layout() {
  return (
    <div className="app">
      <nav className="navbar">
        <span className="logo">
          🎬 CineApp
        </span>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'link ativo' : 'link'
            }
          >
            Início
          </NavLink>

          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              isActive ? 'link ativo' : 'link'
            }
          >
            Sobre
          </NavLink>
        </div>
      </nav>

      <main className="conteudo">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;