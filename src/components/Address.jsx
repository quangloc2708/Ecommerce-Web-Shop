import React from 'react';

import axios from 'axios';
import $ from 'jquery';

const Address = () => {
    const host = 'https://provinces.open-api.vn/api/';
    var callAPI = (api) => {
        return axios.get(api).then((response) => {
            renderData(response.data, 'province');
        });
    };
    callAPI('https://provinces.open-api.vn/api/?depth=1');
    var callApiDistrict = (api) => {
        return axios.get(api).then((response) => {
            renderData(response.data.districts, 'district');
        });
    };
    var callApiWard = (api) => {
        return axios.get(api).then((response) => {
            renderData(response.data.wards, 'ward');
        });
    };

    var renderData = (array, select) => {
        let row = ' <option disable value="">Chọn địa chỉ</option>';
        array.forEach((element) => {
            row += `<option value="${element.code}">${element.name}</option>`;
        });
        document.querySelector('#' + select).innerHTML = row;
    };

    $('#province').change(() => {
        callApiDistrict(host + 'p/' + $('#province').val() + '?depth=2');
        printResult();
    });
    $('#district').change(() => {
        callApiWard(host + 'd/' + $('#district').val() + '?depth=2');
        printResult();
    });
    $('#ward').change(() => {
        printResult();
    });

    var printResult = () => {
        if ($('#district').val() !== '' && $('#province').val() !== '' && $('#ward').val() !== '') {
            let result =
                $('#province option:selected').text() +
                ' | ' +
                $('#district option:selected').text() +
                ' | ' +
                $('#ward option:selected').text();
            $('#result').text(result);
        }
    };

    return (
        <form className="address">
            <select name="" id="province" className="address-item">
                <option value="">* Tỉnh/ Thành phố</option>
            </select>
            <select name="" id="district" className="address-item">
                <option value="">*Quận/ Huyện</option>
            </select>
            <select name="" id="ward" className="address-item">
                <option value="">*Phường / Xã</option>
            </select>
        </form>
    );
};

export default Address;
