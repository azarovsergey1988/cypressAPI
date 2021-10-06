import {accessToken, smsRequest} from "./general";
import {TestData} from "../testData/testData";

const testData = new TestData()

export class Sms {
    getSms(message = testData.data.message, phone = testData.data.phone, sender = testData.data.sender){
        return {
            async: true,
            crossDomain: true,
            url: `https://connect.routee.net/sms`,
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: {
                data: {
                    body: message,
                    to : phone,
                    from: sender
                }
            },
            failOnStatusCode: false
        };
    };

    verifySMSWithInvalidBalance() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status400);
            expect(response.body.code).to.eq(testData.data.insufficientBalanceCode);
            expect(response.body.developerMessage).to.eq(testData.data.invalidBalanceMessage);
        });
    };

    verifySMSWithInvalidToken() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status401);
            expect(response.body.error).to.eq(testData.data.invalidTokenMessage);
        });
    };

    verifySMSWithInvalidField() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status400);
            expect(response.body.code).to.not.eq(testData.data.invalidFieldCode);
        });
    };

    verifySMSSendInvalidSender() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status400);
            expect(response.body.code).to.not.eq(testData.data.invalidSenderCode);
        });
    };
};