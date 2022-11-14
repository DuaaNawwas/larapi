import axios from "axios";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
	const auth_token = localStorage.getItem("auth_token");
	const navigate = useNavigate();

	const handleLogout = () => {
		// axios.get("/sanctum/csrf-cookie").then((response) => {
		axios
			.get("/api/logout", {
				headers: {
					Authorization: `Bearer ${auth_token}`,
				},
			})
			.then((res) => {
				localStorage.removeItem("auth_token");
				localStorage.removeItem("auth_name");

				navigate("/login");
			})
			.catch((err) => {
				console.log(err);
			});
		// });
	};
	return (
		<Navbar fluid={true} rounded={true}>
			<Navbar.Brand href="https://flowbite.com/">
				<img
					src="https://flowbite.com/docs/images/logo.svg"
					className="mr-3 h-6 sm:h-9"
					alt="Flowbite Logo"
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					Flowbite
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				{auth_token != null ? (
					<>
						{" "}
						<Dropdown
							arrowIcon={false}
							inline={true}
							label={
								<Avatar
									alt="User settings"
									img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
									rounded={true}
								/>
							}
						>
							<Dropdown.Header>
								<span className="block text-sm">Bonnie Green</span>
								<span className="block truncate text-sm font-medium">
									name@flowbite.com
								</span>
							</Dropdown.Header>
							<Dropdown.Item>Dashboard</Dropdown.Item>
							<Dropdown.Item>Settings</Dropdown.Item>
							<Dropdown.Item>Earnings</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item>
								<button onClick={handleLogout}>Sign out</button>
							</Dropdown.Item>
						</Dropdown>
						<Navbar.Toggle />{" "}
					</>
				) : (
					<div className="flex gap-5">
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/register">Register</NavLink>
					</div>
				)}
			</div>
			<Navbar.Collapse>
				<NavLink to="/" active={true}>
					Home
				</NavLink>
				{/* <NavLink to="/login">Login</NavLink>
				<NavLink to="/register">Register</NavLink> */}
				<NavLink to="/admin">Admin</NavLink>
			</Navbar.Collapse>
		</Navbar>
	);
}
