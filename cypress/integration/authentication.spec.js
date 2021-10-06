import { Authentication } from "../support/components/authentication";
import { setAssessRequest, setBase64Token } from "../support/components/general";
import { TestData } from "../support/testData/testData";

const testData = new TestData();
const authentification = new Authentication();

describe("Authentication",() => {

    beforeEach(() => {
        authentification.getToken();
    })

    it("should be a valid token", () => {
        setBase64Token(testData.data.Base64Token);
        setAssessRequest(authentification.accessRequest());
        authentification.verifyAccessValid();
    });

    it("should be a invalid token", () => {
        setBase64Token(testData.data.emptyRow);
        setAssessRequest(authentification.accessRequest());
        authentification.verifyAccessInvalidToken();
    });
})