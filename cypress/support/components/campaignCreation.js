import {accessToken, campaignRequest} from "./general";
import {TestData} from "../testData/testData";

const testData = new TestData()

export class CampaignCreation {
    createCampaign(sender_name = testData.data.sender_name, sender_email = testData.data.sender_email,
                   subject = testData.data.subject, body = testData.data.body, list_id = testData.data.list_id){
            return {
                async: true,
                crossDomain: true,
                url: `https://emailapi.routee.net/campaigns`,
                method: "POST",
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    'content-type': "application/json"
                },
                processData: false,
                body: {
                    "sender_name": sender_name,
                    "sender_email": sender_email,
                    "subject": subject,
                    "body": body,
                    "list_id": list_id,
                },
                failOnStatusCode: false
        };
    }

    verifyWithValidToken() {
        cy.request(campaignRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status200);
            expect(response.body).to.have.property(testData.data.id)
        });
    };

    verifyCampaignWithInvalidToken() {
        cy.request(campaignRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status401);
            expect(response.body.message).to.eq(testData.data.unauthorizedMessage);
        });
    };

    verifyCampaignWithMissedSenderName() {
        cy.request(campaignRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status422);
            expect(response.body.message).to.eq(testData.data.senderNameMissingMessage);
            expect(response.body.error_code).to.eq(testData.data.status422);
        });
    };

    verifyCampaignResponse(status, message, error_code) {
        cy.request(campaignRequest).then((response) => {
            expect(response.status).to.eq(status);
            expect(response.body.message).to.eq(message);
            expect(response.body.error_code).to.eq(error_code);
        });
    };
}
