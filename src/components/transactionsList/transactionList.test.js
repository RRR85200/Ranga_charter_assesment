import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import {configure, mount, shallow} from 'enzyme';
import  {render, cleanup, waitForElement} from "@testing-library/react";
import CustomerTransactionsTable from "../customerTransactionsTable/customerTransactionsTable";
import CustomerFilter from '../customersFilter/CustomersFilter';
import TransactionList from "./transactionsList";
import { act } from "react-dom/test-utils";

configure({adapter: new Adapter()});

describe('<Transaction List',() => {
    //
    // beforeEach(()=>{
    //     window.fetch = jest.fn().mockImplementation().mockResolvedValue({
    //         data: [
    //             {
    //                 "customerName": "Ranga Rayapudi",
    //                 "id": 857665,
    //                 "date": "03-02-2020 11:37:50",
    //                 "amount": 120,
    //                 "category": "Streaming"
    //             },
    //         ]
    //     });
    // });

    beforeEach(()=> {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve( {
                    data:[{
                        "customerName": "Ranga Rayapudi",
                        "id": 857665,
                        "date": "03-02-2020 11:37:50",
                        "amount": 120,
                        "category": "Streaming"
                    }]
                },)
            })
        );
    });

    afterEach(()=> {
        cleanup();
    })

    it('should render the not render the list when no data is found', async () => {
        let wrapper;
         await act(async () => {
             wrapper = mount(<TransactionList />);
        });
        wrapper.update();
        expect(wrapper.find(CustomerFilter)).toHaveLength(1);
        expect(wrapper.find(CustomerTransactionsTable)).toHaveLength(1);
        debugger;
        console.log(wrapper.find(CustomerTransactionsTable).props());
        expect(wrapper.find(CustomerTransactionsTable).props()).toMatchObject({
            data: [
                {
                    "customerName": "Ranga Rayapudi",
                    "id": 857665,
                    "date": "03-02-2020 11:37:50",
                    "amount": 120,
                    "category": "Streaming"
                }
            ]
        })

    });

});
