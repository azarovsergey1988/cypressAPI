import { Authentification } from "../support/pageObject/authentification";
import { setAssessRequest, setBase64Token } from "../support/pageObject/general";
import { TestData } from "../support/testData/testData";

const testData = new TestData();
const authentification = new Authentification();

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