import {assessRequest, base64Token, setAccessToken, setBase64Token} from "./general";
import {TestData} from "../testData/testData";

const testData = new TestData();

export class Authentication {
    accessRequest() {
        return {
            async: true,
            crossDomain: true,
            url: "https://auth.routee.net/oauth/token",
            method: "POST",
            headers: {
                authorization: `Basic ${base64Token}`,
                "content-type": "application/x-www-form-urlencoded"
            },
            body: {
                grant_type: "client_credentials"
            },
            failOnStatusCode: false
        };
    };
    getToken()  {
        setBase64Token(testData.data.Base64Token);
        const tokenRequest = this.accessRequest();
        cy.request(tokenRequest).then((response) => {
            setAccessToken(response.body.access_token);
        });
    };
    verifyAccessValid() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status200)
            expect(response.body).to.have.property(testData.data.tokenAccessMessage)
            expect(response.body.token_type).to.eq(testData.data.validTokenType)
        });
    };
    verifyAccessInvalidToken() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(testData.data.status401)
            expect(response.body.error).to.eq(testData.data.invalidBase64TokenError)
            expect(response.body.message).to.eq(testData.data.invalidBase64TokenMessage)
        });
    };
}