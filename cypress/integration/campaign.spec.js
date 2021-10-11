import {setAccessToken, setCampaignRequest} from "../support/components/general";
import {CampaignCreation} from "../support/components/campaignCreation";
import {TestData} from "../support/testData/testData";
import {Authentication} from "../support/components/authentication";

const testData = new TestData();
const campaignCreation = new CampaignCreation();
const authentication = new Authentication();


describe("Creating a campaign", () => {

    beforeEach(() => {
        authentication.getToken();
    })

    it("should be response 200", () => {
        setCampaignRequest(campaignCreation.createCampaign());
        campaignCreation.verifyWithValidToken();
    })

    it("should be 401 error if invalid token", () => {
        setAccessToken(testData.data.emptyRow);
        setCampaignRequest(campaignCreation.createCampaign());
        campaignCreation.verifyCampaignWithInvalidToken();
    })

    it("should be 422 error if missed sender_name", () => {
        setCampaignRequest(campaignCreation.createCampaign(''));
        campaignCreation.verifyCampaignWithMissedSenderName();
    })

    it("should be 422 error and Argument sender_email missing if missed sender_email", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  '',
            testData.data.subject, testData.data.body, testData.data.list_id));
        campaignCreation.verifyCampaignResponse(testData.data.status422,
            testData.data.senderEmailMissingMessage, testData.data.status422);
    })

    it("should be 422 error and Sender not found if wrong sender_email", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.anotherSenderEmail,
            testData.data.subject, testData.data.body, testData.data.list_id));
        campaignCreation.verifyCampaignResponse(testData.data.status422, testData.data.senderNotFoundMessage,
            testData.data.statusCode704);
    })

    it("should be 422 error and Argument subject missing if missed subject", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.sender_email,
            '', testData.data.body, testData.data.list_id));
        campaignCreation.verifyCampaignResponse(testData.data.status422, testData.data.subjectMissingMessage,
            testData.data.status422);
    })

    it("should be 422 error and Argument body missing if missed body", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.sender_email,
            testData.data.subject, '', testData.data.list_id));
        campaignCreation.verifyCampaignResponse(testData.data.status422, testData.data.bodyMissingMessage,
            testData.data.status422);
    })

    it("should be 422 error and Argument body is invalid string if not encoded in base64 body", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.sender_email,
            testData.data.subject, testData.data.subject, testData.data.list_id));
        campaignCreation.verifyCampaignResponse(testData.data.status422, testData.data.bodyInvalidMessage,
            testData.data.status422);
    })

    it("should be 500 ERROR! ", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.sender_email,
            testData.data.subject, 'sdss', testData.data.list_id));
        campaignCreation.verifyCampaignResponse(testData.data.status500, testData.data.intervalServerErrorMessage,
            testData.data.status500);
    })

    it("should be 422 error if missed list_id", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.sender_email,
            testData.data.subject, testData.data.body, ''));
        campaignCreation.verifyCampaignResponse(testData.data.status422, testData.data.listIdMissingMessage,
            testData.data.status422);
    })

    it("should be 422 error and Argument list_id missing if string type in list_id", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.sender_email,
            testData.data.subject, testData.data.body, testData.data.subject));
        campaignCreation.verifyCampaignResponse(testData.data.status422, testData.data.listIdWrongTypeMessage,
            testData.data.status422);
    })

    it("should be 422 error and Book not found if list_id without Book", () => {
        setCampaignRequest(campaignCreation.createCampaign(testData.data.sender_name,  testData.data.sender_email,
            testData.data.subject, testData.data.body, testData.data.status26));
        campaignCreation.verifyCampaignResponse(testData.data.status422, testData.data.bookNotFoundMessage,
            testData.data.statusCode703);
    })







})