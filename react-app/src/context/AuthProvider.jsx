import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: "",
		email: "",
	});

	const token = localStorage.getItem("auth_token");

	useEffect(() => {
		if (localStorage.getItem("auth_token")) {
			axios
				.get("/api/user", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log(res.data.data.user.name);
					const name = res.data.data.user.name;
					const email = res.data.data.user.email;
					setUser({ ...user, name, email });
					// return res.data.data.user;
				});
			console.log(user);
		} else {
			return;
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
