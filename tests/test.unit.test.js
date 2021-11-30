// import React from 'react';
// import testHelpers from '../../../../utils/appHelpers/testHelpers';
// import Statements from './Statements';
// import moment from 'moment';
// import '@testing-library/jest-dom/extend-expect';
// import {cleanup, fireEvent, waitFor} from '@testing-library/react';
// import {mockStatementCards, mockPendingRequests, mockOneStatement} from "../../../../utils/appHelpers/mockData";
// import { NO_STATEMENTS_TEXT, LONG_STATEMENT_REQ_MSG, MISSING_DATA_ERROR } from "../../../../utils/appHelpers/appConstants";
// import * as statementsApi from "../../../../utils/apiHelpers/statementsApi";

// jest.mock("../../../../utils/apiHelpers/statementsApi");
// let yearLastMonth = moment().subtract(1, "months").format("YYYY");
// let yearLastYear = moment().subtract(1, "years").format("YYYY");
// let yearSevenYearsBack = moment(yearLastMonth).subtract(7, "years").format("YYYY");
// let monthNow = moment().format("MMMM");
// let lastMonth =  moment().subtract(1, "months").format("MMMM");
// let lastMonthTwo =  moment().subtract(2, "months").format("MMMM");

// let goodLookupRes = {
//     statements: mockStatementCards,
//     pendingRequests: mockPendingRequests,
//     errors: []
// };

// let goodLookupNoneRes = {
//     statements: [],
//     pendingRequests: [],
//     errors: []
// };

// let goodLookupOneRes = {
//     statements: mockOneStatement,
//     pendingRequests: mockPendingRequests,
//     errors: []
// };

// let badLookupRes = {
//     statements: [],
//     pendingRequests: [],
//     errors: ["mockError"]
// };

// let baseProps = {
//     activeAccount: {
//         primaryAcctNbr: "123123123",
//         bankId: "802"
//     }
// };

// let missingProps = {
//     activeAccount: {
//         primaryAcctNbr: "N/A",
//         bankId: "N/A"
//     }
// };

// describe('[Statements]', () => {

//     beforeEach(() => {jest.resetModules();}, 20000);
//     afterEach(() => {jest.restoreAllMocks(); cleanup();}, 20000);
//     testHelpers.removeAct();

//     it('should render default view with three statement cards and pending requests ', async () => {
//         const fetchStatementsApi = statementsApi.fetchStatments.mockReturnValue(Promise.resolve(goodLookupRes));
//         const {getByTestId, getByText, queryAllByText} = testHelpers.renderWithTheme("light", <Statements {...baseProps}/>);
//         expect(getByTestId("statements-tab")).toBeInTheDocument();
//         expect(getByTestId("loading-spinner")).toBeInTheDocument();
//         await waitFor(()=>{expect(getByTestId("card-0-2021")).toBeInTheDocument();});
//         expect(getByTestId("card-1-2021")).toBeInTheDocument();
//         expect(getByTestId("card-2-2021")).toBeInTheDocument();
//         expect(getByText("Mar 1")).toBeInTheDocument();
//         expect(getByText("Feb 1")).toBeInTheDocument();
//         expect(getByText("Jan 1")).toBeInTheDocument();
//         expect(queryAllByText("2021").length).toBe(3);
//         expect(queryAllByText("REPORT STATUS:").length).toBe(3);
//         expect(getByText("Click To Download")).toBeInTheDocument();
//         expect(queryAllByText("Processing Statement...").length).toBe(2);
//         expect(queryAllByText("Ready For Download").length).toBe(2);
//         expect(queryAllByText("Download PDF").length).toBe(3);
//         expect(queryAllByText("Download XLS").length).toBe(1);
//         expect(queryAllByText("Download CSV").length).toBe(2);
//         expect(getByText("PENDING REQUESTS")).toBeInTheDocument();
//         expect(getByText("Check Status")).toBeInTheDocument();
//         expect(getByText("(Download Now)")).toBeInTheDocument();
//         expect(getByText("Current Statements")).toBeInTheDocument();
//         expect(getByText("Custom Date")).toBeInTheDocument();
//         expect(fetchStatementsApi).toBeCalledTimes(1);
//     });

//     it('should return a regular statement on statment icon click', async () => {
//         const fetchStatementsApi = statementsApi.fetchStatments.mockReturnValue(Promise.resolve(goodLookupRes));
//         const downloadStatementApi = statementsApi.downloadStatement.mockReturnValue(Promise.resolve({ status: 200, errors: [] }));
//         const {getByTestId, queryAllByText} = testHelpers.renderWithTheme("light", <Statements {...baseProps}/>);
//         expect(getByTestId("statements-tab")).toBeInTheDocument();
//         expect(getByTestId("loading-spinner")).toBeInTheDocument();
//         await waitFor(()=>{expect(getByTestId("card-0-2021")).toBeInTheDocument();});
//         expect(getByTestId("pdf-button-0")).toBeInTheDocument();
//         expect(queryAllByText("Click To Download").length).toBe(1);
//         expect(queryAllByText("Processing Statement...").length).toBe(2);
//         expect(queryAllByText("Ready For Download").length).toBe(2);
//         fireEvent.click(getByTestId("pdf-button-0"));
//         fireEvent.click(getByTestId("pdf-button-0"));
//         fireEvent.click(getByTestId("pdf-button-0"));
//         expect(queryAllByText("Click To Download").length).toBe(0);
//         expect(queryAllByText("Processing Statement...").length).toBe(3);
//         await waitFor(()=>{expect(queryAllByText("Click To Download").length).toBe(1);});
//         expect(fetchStatementsApi).toBeCalledTimes(1);
//         expect(downloadStatementApi).toBeCalledTimes(1);
//     });

// });
