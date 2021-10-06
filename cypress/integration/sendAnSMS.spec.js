import {setAccessToken, setSmsRequest} from "../support/components/general";
import {Authentication} from "../support/components/authentication";
import {Sms} from "../support/components/sms";
import {TestData} from "../support/testData/testData";

const testData = new TestData();
const sms = new Sms();
const authentification = new Authentication();

describe("Sending sms", () => {

    beforeEach(() => {
        authentification.getToken();
    })

    it("should be error if invalid token", () => {
        setAccessToken(testData.data.emptyRow);
        setSmsRequest(sms.getSms());
        sms.verifySMSWithInvalidToken();
    })

    it("should be error if insufficient balance", () => {
        setSmsRequest(sms.getSms());
        sms.verifySMSWithInvalidBalance();
    })

    it("should be error if invalid sender", () => {
        setSmsRequest(sms.getSms(testData.data.message, testData.data.phone, testData.data.emptyRow));
        sms.verifySMSSendInvalidSender();
    })

    it("should be error if empty sender", () => {
        setSmsRequest(sms.getSms(testData.data.message, testData.data.phone, testData.data.invalidPhone));
        sms.verifySMSSendInvalidSender();
    })

    it("should be error if empty messages", () => {
        setSmsRequest(sms.getSms(testData.data.emptyRow));
        sms.verifySMSWithInvalidField();
    })

    it("should be error if invalid phone", () => {
        setSmsRequest(sms.getSms(testData.data.message,testData.data.invalidPhone));
        sms.verifySMSWithInvalidField();
    })

    it("should be error if text in phone field", () => {
        setSmsRequest(sms.getSms(testData.data.message,testData.data.message));
        sms.verifySMSWithInvalidField();
    })

    it("should be error if no + in phone field", () => {
        setSmsRequest(sms.getSms(testData.data.message,testData.data.phoneWithoutPlus));
        sms.verifySMSWithInvalidField();
    })

    it("should be error if empty phone", () => {
        setSmsRequest(sms.getSms(testData.data.message,testData.data.emptyRow));
        sms.verifySMSWithInvalidField();
    })


})