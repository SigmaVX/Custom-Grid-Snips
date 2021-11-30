// import React, { useState, useRef, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import styles from "./TransferSA.module.css";
// import SuccessForm from "../SuccessForm/SuccessForm";
// import FlexButton from "../../UI/Buttons/FlexButton/FlexButton";
// import UiTkComboBox from "../../UI/Forms/Dropdowns/UiTkComboBox/UiTkComboBox";
// import transferImg from "../../../assets/images/action-relocate.svg";
// import ErrorLabel from "../../UI/Labels/ErrorLabel/ErrorLabel";
// import TopLabel from "../../UI/Labels/TopLabel/TopLabel";
// import { transferSubaccount } from "../../../utils/apiHelpers/subaccountApi";
// import { getDeptList } from "../../../utils/apiHelpers/buildingDeptApi";
// import { getAccountStatus, removingLeadingZeros } from "../../../utils/appHelpers/appHelpers";
// import {
// 	MISSING_DATA_ERROR,
// 	INACTIVE_SUBACCOUNT_ERROR,
// 	LOOKUP_DEPT_LIST_ERROR,
// 	TRANSFER_DEPT_INSTRUCTION_SDA,
// 	TRANSFER_DEPT_NO_DEPT_SDA,
// 	TRANSFER_DEPT_CONFIRM_TEXT_SDA,
// 	TRANSFER_DEPT_SUCCESS_TEXT_SDA
// } from "../../../utils/appHelpers/appConstants";

// const TransferSA = (props) => {
// 	const { closeModal, openPrompt, onDirtyHandler, dirtyValue, activeSubaccount, reloadPage } = props;
// 	const { bankId, ddaStatusCode, subName, subNumber, corpCustomerId, deptId, deptName } = activeSubaccount;
// 	const [subData] = useState({ bankId, corpCustomerId, deptId, subNumber });
// 	const [formState, setFormState] = useState("form"); // form, confirm, success
// 	const [submittingData, setSubmittingData] = useState(false);
// 	const [instructions, setInstructions] = useState("");
// 	const [errorMsg, setErrorMsg] = useState("");
// 	const [missingData, setMissingData] = useState(false);
// 	const [deptList, setDeptList] = useState([]);
// 	const [deptData, setDeptData] = useState([]);
// 	const [newDeptId, setNewDeptId] = useState("");
// 	const [newDeptName, setNewDeptName] = useState("");
// 	const errorElement = useRef(null);

// 	const getDeptListSda = useCallback(async () => {
// 		setInstructions("...Loading Subaccount Details");
// 		let response = await getDeptList(corpCustomerId, deptId);
// 		if (response.errorText && response.errorText.length > 0) {
// 			setInstructions(LOOKUP_DEPT_LIST_ERROR);
// 			if (errorElement.current) {
// 				errorElement.current.scrollIntoView(true);
// 			}
// 		} else {
// 			setDeptList(response.deptList);
// 			setDeptData(response.deptData);
// 			if (response.deptList.length === 0) {
// 				setInstructions(TRANSFER_DEPT_NO_DEPT_SDA);
// 				setMissingData(true);
// 			} else {
// 				setInstructions(TRANSFER_DEPT_INSTRUCTION_SDA);
// 			}
// 		}
// 	}, [corpCustomerId, deptId]);

// 	useEffect(() => {
// 		let instructions = TRANSFER_DEPT_INSTRUCTION_SDA;
// 		let validForm = true;

// 		// Missing Data Check
// 		for (let key in subData) {
// 			if (subData[key] === "N/A") {
// 				console.log("[TransferSA] - Missing Transfer Dept Data For: ", key);
// 				validForm = false;
// 				instructions = MISSING_DATA_ERROR;
// 			}
// 		}
// 		//  Inactive Account Check
// 		let getSubStatus = getAccountStatus(ddaStatusCode, "dda");
// 		if (getSubStatus === "inactive") {
// 			console.log("[TransferSA] - Inactive SDA Subaccount");
// 			validForm = false;
// 			instructions = INACTIVE_SUBACCOUNT_ERROR;
// 		}

// 		if (validForm) {
// 			getDeptListSda();
// 		} else {
// 			setInstructions(instructions);
// 			setMissingData(true);
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	const inputHandler = (value) => {
// 		onDirtyHandler(true);
// 		if (!value) {
// 			setNewDeptId("");
// 			setNewDeptName("");
// 		} else {
// 			for (let i = 0; i < deptList.length; i++) {
// 				if (value === deptData[i].text) {
// 					setNewDeptId(deptData[i].value);
// 					setNewDeptName(deptData[i].name);
// 					break;
// 				}
// 			}
// 		}
// 	};

// 	const nextHandler = () => {
// 		setInstructions(TRANSFER_DEPT_CONFIRM_TEXT_SDA);
// 		setFormState("confirm");
// 	};

// 	const submitHandler = async () => {
// 		if (submittingData) {
// 			return;
// 		}
// 		setSubmittingData(true);
// 		let reqObject = {
// 			departmentMnemonic: newDeptId,
// 			oldDepartmentMnemonic: deptId,
// 			subAccountNumber: subNumber,
// 			bankId: bankId
// 		};
// 		let response = await transferSubaccount(reqObject);
// 		setSubmittingData(false);
// 		if (response.errors.length > 0) {
// 			setErrorMsg(response.errors[0]);
// 			if (errorElement.current) {
// 				errorElement.current.scrollIntoView(true);
// 			}
// 		} else {
// 			setFormState("success");
// 		}
// 	};

// 	const finishHandler = () => {
// 		closeModal();
// 		setTimeout(() => {
// 			reloadPage();
// 		}, 1000);
// 	};

// 	return (
// 		<React.Fragment>
// 			{errorMsg && <ErrorLabel value={errorMsg} errorRef={errorElement} />}
// 			{formState === "form" && (
// 				<div className={styles.componentWrapper} data-testid={"transfer-dept-form"}>
// 					<h2 className={"formInstructions"}>{instructions}</h2>
// 					<div className={styles.gridWrapper}>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="Subaccount Name" value={subName} />
// 						</div>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="Subaccount Number" value={removingLeadingZeros(activeSubaccount.subNumber)} />
// 						</div>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="Current Department Name" value={deptName} />
// 						</div>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="Current Department ID" value={deptId} />
// 						</div>
// 					</div>
// 					<div className={[styles.comboBoxWrapper, styles.card].join(" ")}>
// 						<UiTkComboBox
// 							name={"deptList"}
// 							label={"Available Departments"}
// 							options={deptList}
// 							handleChange={(e) => inputHandler(e)}
// 							helperText={"Required - Type or Select New Department"}
// 							errorText={""}
// 							required={true}
// 							disabled={deptList.length === 0}
// 						/>
// 					</div>
// 					<div className={styles.twoCol}>
// 						<FlexButton
// 							name={"cancel"}
// 							btnText={"Cancel"}
// 							clickHandler={dirtyValue ? openPrompt : closeModal}
// 							variant={"regular"}
// 							width={200}
// 							ariaDescribedBy="descriptionClose"
// 						/>
// 						<FlexButton name={"next"} btnText={"Next"} clickHandler={nextHandler} disabled={newDeptId === "" || missingData} variant={"cta"} width={200} />
// 					</div>
// 				</div>
// 			)}
// 			{formState === "confirm" && (
// 				<div className={styles.componentWrapper} data-testid={"transfer-dept-form"}>
// 					<h2 className={"formInstructions"}>{instructions}</h2>
// 					<div className={styles.gridWrapper}>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="Current Department ID" value={deptId} />
// 						</div>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="Current Department Name" value={deptName} />
// 						</div>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="New Department ID" value={newDeptId} />
// 						</div>
// 						<div className={styles.oneCol}>
// 							<TopLabel label="New Department Name" value={newDeptName} />
// 						</div>
// 						<div className={[styles.twoCol, styles.cofirmButtonWrapper].join(" ")}>
// 							<FlexButton name={"cancel"} btnText={"No"} clickHandler={openPrompt} variant={"regular"} width={200} ariaDescribedBy="descriptionClose" />
// 							<FlexButton name={"transfer"} btnText={"Yes"} clickHandler={submitHandler} disabled={submittingData} variant={"cta"} width={200} showSpinner={submittingData} />
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			{formState === "success" && (
// 				<SuccessForm onFinish={finishHandler} bodyText={TRANSFER_DEPT_SUCCESS_TEXT_SDA} imgSrc={transferImg} name={"Subaccount"} showNextOption={false} />
// 			)}
// 		</React.Fragment>
// 	);
// };

// export default TransferSA;

// TransferSA.propTypes = {
// 	closeModal: PropTypes.func.isRequired,
// 	openPrompt: PropTypes.func.isRequired,
// 	activeSubacct: PropTypes.object,
// 	dirtyValue: PropTypes.bool.isRequired,
// 	onDirtyHandler: PropTypes.func.isRequired,
// 	reloadPage: PropTypes.func.isRequired
// };
