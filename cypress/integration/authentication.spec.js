import { Authentication } from "../support/components/authentication";
import { setAssessRequest, setBase64Token } from "../support/components/general";
import { TestData } from "../support/testData/testData";

const testData = new TestData();
const authentication = new Authentication();

describe("Authentication",() => {

    beforeEach(() => {
        authentication.getToken();
    })

    it("should be a valid token", () => {
        setBase64Token(testData.data.Base64Token);
        setAssessRequest(authentication.accessRequest());
        authentication.verifyAccessValid();
    });

    it("should be an error if empty token", () => {
        setBase64Token(testData.data.emptyRow);
        setAssessRequest(authentication.accessRequest());
        authentication.verifyAccessEmptyToken();
    });

    it("should be an error if invalid token", () => {
        setBase64Token(testData.data.wrongBase64Token);
        setAssessRequest(authentication.accessRequest());
        authentication.verifyAccessInvalidToken();
    });
})