import { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";

import { NoteContext } from "../../context/NoteContext";

import "./Sidebar.css";
import { Menu, Item, useContextMenu } from "react-contexify";

const MENU_ID = "CATEGORIES";

const Sidebar = () => {
	const { categories, handleAddCategory, handleEditCategory, handleDeleteCategory } = useContext(NoteContext);

	const { show } = useContextMenu({
		id: MENU_ID,
	});

	const handleContextMenu = (event) => {
		show({
			event,
			props: {
				key: "value",
			},
		});
	};

	return (
		<aside className="sidebar">
			<nav className="sidebar__categories">
				<NavLink to="/notes" className="sidebar__home">
					<ion-icon name="home"></ion-icon>
				</NavLink>

				{categories.map((category) => (
					<Fragment key={category.id}>
						<NavLink
							key={category.id}
							onContextMenu={handleContextMenu}
							className={`sidebar__item ${category.color}`}
							id={category.id}
							to={`/notes/category/${category.id}`}
						></NavLink>

						<Menu id={MENU_ID} animation={{ enter: "scale", exit: "fade" }}>
							<Item id="edit" onClick={handleEditCategory}>
								<ion-icon name="create-outline"></ion-icon>
								Edit category
							</Item>
							<Item id="delete" onClick={handleDeleteCategory}>
								<ion-icon name="trash-outline"></ion-icon>
								Delete
							</Item>
						</Menu>
					</Fragment>
				))}

				<button className="sidebar__add" onClick={handleAddCategory}>
					<ion-icon name="add"></ion-icon>
				</button>
			</nav>
		</aside>
	);
};

export default Sidebar;
