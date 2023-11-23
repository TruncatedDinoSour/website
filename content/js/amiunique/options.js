"use strict";

function make_range(from, to) {
    return (from + to) / 2;
}

function make_percent(percent) {
    return (100 - percent) * 0.01;
}

function yes_no(percent) {
    return [
        { title: "Yes", rarity: percent },
        { title: "No", rarity: 1 - percent },
    ];
}

/*
 * Rarity is between 0 and 1, to make it
 * more human readable use make_percent() function
 * for example make_percent(10) would return 0.9
 * as if a thing affects 10% of the population
 * 90% would be untouched by average
 *
 * If an option is in a range, for example from
 * 55% to 79% use the make_range() function, for example:
 * make_percent(make_range(55, 79)) would be 0.67 (67%)
 * The percent should be how common a thing is, not
 * how rare
 *
 * For a yes/no question use yes_no() function passing
 * it in a percent value
 */
const TEST_OPTIONS = [
    {
        title: "What is your eye colour?",
        options: [
            { title: "Blue", rarity: make_percent(1) },
            { title: "Brown", rarity: make_percent(make_range(55, 79)) },
            { title: "Grey", rarity: make_percent(1) },
            { title: "Green", rarity: make_percent(2) },
            { title: "Hazel", rarity: make_percent(10) },
            { title: "Red/violet", rarity: make_percent(1) },
        ],
    },
    {
        title: "What is your natural hair colour?",
        options: [
            { title: "Black", rarity: make_percent(make_range(75, 85)) },
            { title: "Brown", rarity: make_percent(11) },
            { title: "Blond", rarity: make_percent(3) },
            { title: "White", rarity: make_percent(1) },
            { title: "Red", rarity: make_percent(1) },
        ],
    },
    {
        title: "Are you a part of the LGBT community?",
        options: yes_no(make_percent(make_range(1.2, 6.8))),
    },
    {
        title: "What is your race?",
        options: [
            { title: "White", rarity: make_percent(100 - 61.6) },
            { title: "Black", rarity: make_percent(16.72) },
            { title: "Hispanic", rarity: make_percent(8.42) },
            { title: "Asian", rarity: make_percent(59.76) },
            { title: "Other", rarity: make_percent(10.2) },
        ],
    },
    {
        title: "Do you have an ASD?",
        options: yes_no(make_percent(1)),
    },
    {
        title: "What continent do you live in?",
        options: [
            { title: "Asia", rarity: make_percent(59.54) },
            { title: "Africa", rarity: make_percent(17.2) },
            { title: "Europe", rarity: make_percent(9.59) },
            { title: "North America", rarity: make_percent(7.6) },
            { title: "South America", rarity: make_percent(5.53) },
            { title: "Australia", rarity: make_percent(0.55) },
            { title: "Antarctica", rarity: make_percent(0) }, // ???
        ],
    },
    {
        title: "Do you have children?",
        options: yes_no(make_percent(80)),
    },
    {
        title: "Do you know more than one language?",
        options: yes_no(make_percent(40)),
    },
    {
        title: "Are you vegetarian?",
        options: yes_no(make_percent(22)),
    },
    {
        title: "Are you vegan?",
        options: yes_no(make_percent(1)),
    },
    {
        title: "Do you have depression?",
        options: yes_no(make_percent(make_percent(3.8))),
    },
    {
        title: "Do you have a job?",
        options: yes_no(make_percent(make_percent(55.8))),
    },
    {
        title: "Do you have an eating disorder?",
        options: yes_no(make_percent(make_percent(9))),
    },
    {
        title: "Are you left-handed?",
        options: yes_no(make_percent(make_percent(10))),
    },
    {
        title: "Do you have diabetes?",
        options: yes_no(make_percent(make_percent(10))),
    },
    {
        title: "Do you have social anxiety?",
        options: yes_no(make_percent(make_percent(7.1))),
    },
    {
        title: "Do you have asthma?",
        options: yes_no(make_percent(make_percent(make_range(5, 10)))),
    },
    {
        title: "Are you lactose intolerant?",
        options: yes_no(make_percent(make_percent(68))),
    },
    {
        title: "Are you fatherless?",
        options: yes_no(make_percent(33)),
    },
    {
        title: "Are you a virgin?",
        options: yes_no(make_percent(make_range(0.3, 14))),
    },
    {
        title: "Do you use social media?",
        options: yes_no(make_percent(58.4)),
    },
    {
        title: "Are you under 18?",
        options: yes_no(make_percent(29.3)),
    },
    {
        title: "Do you have dimples?",
        options: yes_no(make_percent(make_range(20, 30))),
    },
    {
        title: "Do you know how to code?",
        options: yes_no(make_percent(0.5)),
    },
    {
        title: "Do you live in a city?",
        options: yes_no(make_percent(55)),
    },
    {
        title: "Have you had COVID-19 in 2021",
        options: yes_no(make_percent(43.9)),
    },
    {
        title: "Do you have heart problems?",
        options: yes_no(make_percent(1.72)),
    },
    {
        title: "Do you have a chronic illness?",
        options: yes_no(make_percent(95)),
    },
    {
        title: "Do you have mental issues and/or disorders?",
        options: yes_no(make_percent(10.7)),
    },
    {
        title: "Do you have cancer?",
        options: yes_no(make_percent(1.3)),
    },
    {
        title: "Do you have tatoos?",
        options: yes_no(make_percent(38)),
    },
    {
        title: "Can you wiggle your ears?",
        options: yes_no(make_percent(make_range(10, 20))),
    },
    {
        title: "Can you wiggle your nose?",
        options: yes_no(make_percent(5)),
    },
    {
        title: "Do you have morton's toe?",
        options: yes_no(make_percent(15)),
    },
    {
        title: "Do you have hypermobile joints?",
        options: yes_no(make_percent(make_range(10, 25))),
    },
];

export default TEST_OPTIONS;
