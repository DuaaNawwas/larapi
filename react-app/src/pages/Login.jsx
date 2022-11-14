import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
		errors: [],
	});

	const handleInput = (e) => {
		e.persist();

		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleLogin = (e) => {
		e.preventDefault();

		const data = {
			email: loginData.email,
			password: loginData.password,
		};

		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/login", data).then((res) => {
				if (res.data.status === "Request was successfull.") {
					console.log(res);
					localStorage.setItem("auth_token", res.data.data.token);
					localStorage.setItem("auth_name", res.data.data.user.name);
					const name = res.data.data.user.name;
					const email = res.data.data.user.email;
					setUser({ ...user, name, email });
					navigate("/", { replace: true });
				} else {
					console.log(res);
					setLoginData({ ...loginData, errors: res.data.errors });
				}
			});
		});
	};

	return (
		<form className="w-1/2 mx-auto pt-10" onSubmit={handleLogin}>
			<div className="mb-6">
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Your email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="name@flowbite.com"
					required=""
					value={loginData.email}
					onChange={handleInput}
				/>
				<span>{loginData.errors.email}</span>
			</div>
			<div className="mb-6">
				<label
					htmlFor="password"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Your password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required=""
					value={loginData.password}
					onChange={handleInput}
				/>
				<span>{loginData.errors.password}</span>
			</div>
			{/* <div className="flex items-start mb-6">
				<div className="flex items-center h-5">
					<input
						id="remember"
						type="checkbox"
						value=""
						className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
						required=""
					/>
				</div>
				<label
					htmlFor="remember"
					className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Remember me
				</label>
			</div> */}
			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Submit
			</button>
		</form>
	);
}
