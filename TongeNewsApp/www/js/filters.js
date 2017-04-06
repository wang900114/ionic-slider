angular.module('starter.filter', [])
    .filter('substring', function () {
        return function (str) {
            if (str.length >= 40) {
                return str.substr(0, 40) + "...";
            }
            return str;
        }
    })
    .filter('toSex', function () {
        return function (gender) {
            if (gender) {
                return "男";
            }
            return "女";
        }
    })
    .filter('toDate', function () {
        return function (date) {
           return new Date(parseInt(date)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        }
    })