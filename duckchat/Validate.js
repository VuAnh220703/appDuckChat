export class Validate{

    // validate fullName input
    isValidateFullName(fullName){
        let regex = /^[a-zA-Z\s]+$/;
        return regex.test(fullName)
    }

    // validate numberphone input
    isValidateNumberphone(numberphone){
        let regex = /^0\d{9}$/;
        return regex.test(numberphone)
    }

    // validate address
    isValidateAddress(address){
        let regex = /^[a-zA-Z0-9\s]+(?:,[a-zA-Z0-9\s]+)*(?:\/[a-zA-Z0-9\s\/]+)?$/;
        return regex.test(address);
    }
}