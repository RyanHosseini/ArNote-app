import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { useImmer } from "use-immer";

import { addNote } from "../../services/NoteService";

import { NoteContext } from "../../context/NoteContext";
import { toast } from "react-hot-toast";

import { NoteSchema } from "../../validations/NoteValidation";

import "./AddNote.css";

const AddNote = () => {
	const { categories, setNotes, setAllNotes, clearSearch } = useContext(NoteContext);

	const [note, setNote] = useImmer({});
	const navigate = useNavigate();

	const [addBtnState, setAddBtnState] = useState(false);

	const addBtnClass = classNames({
		add__btn: true,
		"add__btn--extend": addBtnState,
	});

	const handleESC = (e) => (e.key === "Escape" ? navigate("/notes") : null);

	useEffect(() => {
		window.addEventListener("keydown", handleESC);
		return () => window.removeEventListener("keydown", handleESC);
	}, []);

	const handleAdd = async (category) => {
		// Clear search
		clearSearch();

		// Validation
		try {
			await NoteSchema.validate(note, { abortEarly: false });
		} catch (err) {
			return toast.error(err.message);
		}

		const newNote = {
			...note,
			category,
			isFavorite: false,
			date: { year: new Date().getFullYear(), month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date()), day: new Date().getDate() },
		};
		const { data, status } = await addNote(newNote);

		if (status === 201) {
			setNotes((draft) => {
				draft.push(data);
			});

			setAllNotes((draft) => {
				draft.push(data);
			});

			toast.success("Added!");
			navigate("/notes");
		} else {
			toast.error("Error! Couldn't add a new note!");
		}
	};

	return (
		<div className="add animate__animated animate__fadeIn">
			<div className="add__box">
				<textarea
					className="add__body"
					placeholder="Take a note..."
					value={note.body}
					onChange={(e) =>
						setNote((draft) => {
							draft.body = e.target.value;
						})
					}
				></textarea>

				<div className="add__wrapper">
					<div className={addBtnClass} style={{ width: addBtnState ? "100%" : "110px" }} onClick={() => setAddBtnState((prevState) => !prevState)}>
						<span className="add__btn-text">
							Add
							<ion-icon name="chevron-forward-outline"></ion-icon>
						</span>

						<ul
							className="add__categories"
							style={
								addBtnState
									? {
											width: "max-content",
											visibility: "visible",
											userSelect: "auto",
											pointerEvents: "auto",
											transition: "all 0.4s ease-out",
											transitionDelay: ".3s",
									  }
									: { opacity: "0", visibility: "hidden", width: "auto" }
							}
						>
							{categories.map((c) => (
								<li
									key={c.id}
									onClick={(e) => {
										e.stopPropagation();
										handleAdd(c.id);
									}}
									style={{
										transition: `all ${parseInt(c.id)}s ease-in`,
									}}
								>
									<button className="add__categories-btn">{c.name}</button>
									<div className={`add__bar add__bar--${c.color}`}></div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<button className="add__delete-btn" onClick={() => navigate("/notes")}>
					<ion-icon name="trash"></ion-icon>
				</button>
			</div>

			<div className="overlay" onClick={() => navigate("/notes")}></div>
		</div>
	);
};

export default AddNote;
