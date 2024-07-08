document.addEventListener('DOMContentLoaded', showRandomUser);
document.querySelector('.app__btn_activate').addEventListener('click', showRandomUser);
document.querySelector('.app__btn_reset').addEventListener('click', clearValues);

const userGenerator = {
    GENDER_MALE: 'Мужской',
    GENDER_FEMALE: 'Женский',

    getRandomNumber: function (min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },

    getRandomValue: function (json) {
        const obj = JSON.parse(json);
        const randomKey = this.getRandomNumber(1, obj.count);
        return obj.list[`id_${randomKey}`];
    },

    generateGender: function () {
        return this.getRandomNumber(0, 1) === 0 ? this.GENDER_MALE : this.GENDER_FEMALE;
    },

    generateName: function (gender) {
        const json = gender === this.GENDER_MALE ? maleNames : femaleNames;
        return this.getRandomValue(json);
    },

    generateSurname: function (gender) {
        const randomSurname = this.getRandomValue(maleSurnames);
        return gender === this.GENDER_MALE ? randomSurname : randomSurname + 'a';
    },

    generatePatronymic: function (gender) {
        const randomName = this.getRandomValue(maleNames);
        let userPatronymic;
        if (gender === this.GENDER_MALE) {
            userPatronymic = `${randomName}ович`;
            if (randomName.slice(randomName.length - 2) === 'ий') {
                userPatronymic = `${randomName.slice(0, randomName.length - 2)}ьевич`;
            } else if (randomName === 'Никита') {
                userPatronymic = `${randomName.slice(0, randomName.length - 1)}ич`;
            } else if (randomName === 'Михаил') {
                userPatronymic = `${randomName.slice(0, -2)}йлович`;
            } else if (randomName.slice(randomName.length - 2) === 'ей') {
                userPatronymic = `${randomName.slice(0, randomName.length - 1)}евич`;
            } else if (randomName.slice(randomName.length - 2) === 'ья') {
                userPatronymic = `${randomName.slice(0, randomName.length - 1)}ич`;
            }
        } else {
            userPatronymic = `${randomName}овна`;
            if (randomName.slice(randomName.length - 2) === 'ий') {
                userPatronymic = `${randomName.slice(0, randomName.length - 2)}ьевна`;
            } else if (randomName === 'Никита' && gender === this.GENDER_FEMALE) {
                userPatronymic = `${randomName.slice(0, randomName.length - 1)}ична`;
            } else if (randomName.slice(randomName.length - 2) === 'ей') {
                userPatronymic = `${randomName.slice(0, randomName.length - 1)}евна`;
            } else if (randomName === 'Михаил') {
                userPatronymic = `${randomName.slice(0, -2)}йловна`;
            } else if (randomName.slice(randomName.length - 2) === 'ья') {
                userPatronymic = `${randomName.slice(0, randomName.length - 1)}инична`;
            }
        }
        return userPatronymic;
    },

    generateProfession: function (gender) {
        const json = gender === this.GENDER_MALE ? maleProfession : femaleProfession;
        return this.getRandomValue(json);
    },

    generateBirthday: function () {
        const monthList = JSON.parse(months);
        const randomKey = this.getRandomNumber(1, monthList.count);
        let month = monthList.list[`id_${randomKey}`];
        let dayLimit =
            month === 'февраль'
                ? 28
                : month === 'апрель' || month === 'июнь' || month === 'сентябрь' || month === 'ноябрь'
                ? 30
                : 31;

        let day = this.getRandomNumber(1, dayLimit);
        month = month.includes('ь') || month.includes('й') ? `${month.slice(0, -1)}я` : `${month}а`;
        let year = this.getRandomNumber(1960, new Date().getFullYear() - 21);

        return `${day} ${month} ${year}`;
    }
};

function CreateRandomUser() {
    const gender = userGenerator.generateGender();
    this.name = userGenerator.generateName(gender);
    this.surname = userGenerator.generateSurname(gender);
    this.patronymic = userGenerator.generatePatronymic(gender);
    this.gender = gender;
    this.profession = userGenerator.generateProfession(gender);
    this.birthday = userGenerator.generateBirthday();
}

function showRandomUser() {
    const randomUser = new CreateRandomUser();
    document.querySelector('.name').textContent = randomUser.name;
    document.querySelector('.surname').textContent = randomUser.surname;
    document.querySelector('.patronymic').textContent = randomUser.patronymic;
    document.querySelector('.gender').textContent = randomUser.gender;
    document.querySelector('.profession').textContent = randomUser.profession;
    document.querySelector('.birthday').textContent = randomUser.birthday;
}

function clearValues() {
    document.querySelector('.name').textContent = '';
    document.querySelector('.surname').textContent = '';
    document.querySelector('.patronymic').textContent = '';
    document.querySelector('.gender').textContent = '';
    document.querySelector('.profession').textContent = '';
    document.querySelector('.birthday').textContent = '';
}
