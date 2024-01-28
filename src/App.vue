<template>
    <Questionnaire :client-data="clientData"/>
</template>

<script>
import Questionnaire from './components/Questionnaire.vue'

export default {
    name: 'App',
    components: {
        Questionnaire
    },
    data() {
        return {
            clientData: {
                name: 'Donut',
                logo: 'https://donut.media/cdn/shop/files/DONM-0114_StoreRetheme_SiteExp_Logo-01_x300.png?v=1670446627',
                copyright: 'Donut Media © 2024',
                background: 'https://donut.media/cdn/shop/files/jan_web_header.png?v=1705685702',
                intro: {
                    title: 'Welcome to the Donut Poll!',
                    text: 'Firstly, thank you for taking the time to fill out this questionnaire. Your answers here will help us to craft our future content to your liking. As you already know, we love everything involving cars, but what you may not know is how much we love our fans! Getting to know the people who have made our channel a success has been a great joy. Thank you again for your time, we look forward to hearing from you!',
                    ctaText: 'Start'
                },
                fields: [
                    {
                        label: 'Email',
                        id: 'email',
                        type: 'email',
                        value: '',
                        required: true
                    },
                    {
                        label: 'What is your birthday?',
                        id: 'birthday',
                        type: 'datepicker',
                        value: '',
                        required: false
                    },
                    {
                        label: 'Would you be interested attending a Donut event?',
                        id: 'eventInterest',
                        type: 'radio',
                        options: ['Yes', 'No'],
                        value: '',
                        required: false
                    },
                    {
                        label: 'What is your favorite kind of Donut video?',
                        id: 'favoriteVideo',
                        type: 'select',
                        value: '',
                        options: [
                            {
                                label: 'Select an Option',
                                value: ''
                            },
                            {
                                label: 'Up to Speed',
                                value: 'uts'
                            },
                            {
                                label: 'Bumper 2 Bumper',
                                value: 'b2b'
                            },
                            {
                                label: 'WheelHouse',
                                value: 'wh'
                            },
                            {
                                label: 'Money Pit',
                                value: 'mp'
                            },
                            {
                                label: 'Science Garage',
                                value: 'sg'
                            },
                            {
                                label: 'Hi Low',
                                value: 'hl'
                            },
                            {
                                label: 'D-List',
                                value: 'dl'
                            },
                            {
                                label: 'Donut Podcast',
                                value: 'dp'
                            },
                            {
                                label: 'Donut News',
                                value: 'dn'
                            },
                            {
                                label: 'Donut Shop',
                                value: 'ds'
                            },
                            {
                                label: 'Donut Underground',
                                value: 'du'
                            }
                        ],
                        required: false
                    },
                    {
                        label: 'What vehicles do you own?',
                        id: 'vehicles',
                        type: 'checkbox',
                        options: [
                            {
                                label: 'Car',
                                value: 'car',
                                selected: false
                            },
                            {
                                label: 'Truck',
                                value: 'truck',
                                selected: false
                            },
                            {
                                label: 'Van',
                                value: 'van',
                                selected: false
                            },
                            {
                                label: 'Motorcycle',
                                value: 'motorcycle',
                                selected: false
                            },
                        ],
                        value: '',
                        required: false
                    },
                    {
                        label: 'What state are you from?',
                        id: 'state',
                        type: 'select',
                        options: [
                            {
                                label: 'Select an Option',
                                value: ''
                            },
                            {
                                label: 'Alabama',
                                value: 'AL'
                            },
                            {
                                label: 'Alaska',
                                value: 'AK'
                            },
                            {
                                label: 'Arizona',
                                value: 'AZ'
                            },
                            {
                                label: 'Arkansas',
                                value: 'AR'
                            },
                            {
                                label: 'California',
                                value: 'CA'
                            },
                            {
                                label: 'Colorado',
                                value: 'CO'
                            },
                            {
                                label: 'Connecticut',
                                value: 'CT'
                            },
                            {
                                label: 'Delaware',
                                value: 'DE'
                            },
                            {
                                label: 'Florida',
                                value: 'FL'
                            },
                            {
                                label: 'Georgia',
                                value: 'GA'
                            },
                            {
                                label: 'Hawaii',
                                value: 'HI'
                            },
                            {
                                label: 'Idaho',
                                value: 'ID'
                            },
                            {
                                label: 'Illinois',
                                value: 'IL'
                            },
                            {
                                label: 'Indiana',
                                value: 'IN'
                            },
                            {
                                label: 'Iowa',
                                value: 'IA'
                            },
                            {
                                label: 'Kansas',
                                value: 'KS'
                            },
                            {
                                label: 'Kentucky',
                                value: 'KY'
                            },
                            {
                                label: 'Louisiana',
                                value: 'LA'
                            },
                            {
                                label: 'Maine',
                                value: 'ME'
                            },
                            {
                                label: 'Maryland',
                                value: 'MD'
                            },
                            {
                                label: 'Massachusetts',
                                value: 'MA'
                            },
                            {
                                label: 'Michigan',
                                value: 'MI'
                            },
                            {
                                label: 'Minnesota',
                                value: 'MN'
                            },
                            {
                                label: 'Mississippi',
                                value: 'MS'
                            },
                            {
                                label: 'Missouri',
                                value: 'MO'
                            },
                            {
                                label: 'Montana',
                                value: 'MT'
                            },
                            {
                                label: 'Nebraska',
                                value: 'NE'
                            },
                            {
                                label: 'Nevada',
                                value: 'NV'
                            },
                            {
                                label: 'New Hampshire',
                                value: 'NH'
                            },
                            {
                                label: 'New Jersey',
                                value: 'NJ'
                            },
                            {
                                label: 'New Mexico',
                                value: 'NM'
                            },
                            {
                                label: 'New York',
                                value: 'NY'
                            },
                            {
                                label: 'North Carolina',
                                value: 'NC'
                            },
                            {
                                label: 'North Dakota',
                                value: 'ND'
                            },
                            {
                                label: 'Ohio',
                                value: 'OH'
                            },
                            {
                                label: 'Oklahoma',
                                value: 'OK'
                            },
                            {
                                label: 'Oregon',
                                value: 'OR'
                            },
                            {
                                label: 'Pennsylvania',
                                value: 'PA'
                            },
                            {
                                label: 'Rhode Island',
                                value: 'RI'
                            },
                            {
                                label: 'South Carolina',
                                value: 'SC'
                            },
                            {
                                label: 'South Dakota',
                                value: 'SD'
                            },
                            {
                                label: 'Tennessee',
                                value: 'TN'
                            },
                            {
                                label: 'Texas',
                                value: 'TX'
                            },
                            {
                                label: 'Utah',
                                value: 'UT'
                            },
                            {
                                label: 'Vermont',
                                value: 'VT'
                            },
                            {
                                label: 'Virginia',
                                value: 'VA'
                            },
                            {
                                label: 'Washington',
                                value: 'WA'
                            },
                            {
                                label: 'West Virginia',
                                value: 'WV'
                            },
                            {
                                label: 'Wisconsin',
                                value: 'WI'
                            },
                            {
                                label: 'Wyoming',
                                value: 'WY'
                            },
                            ],
                        value: '',
                        required: false
                    },
                    {
                        label: 'What is your favorite car?',
                        id: 'favoriteCar',
                        type: 'text',
                        value: '',
                        required: false
                    },
                    {
                        label: 'What types of racing do you watch?',
                        id: 'racingTypes',
                        type: 'checkbox',
                        value: '',
                        options: [
                            {
                                label: 'NASCAR',
                                value: 'nascar',
                                selected: false
                            },
                            {
                                label: 'Formula 1',
                                value: 'f1',
                                selected: false
                            },
                            {
                                label: 'Drag Racing',
                                value: 'drag',
                                selected: false
                            },
                            {
                                label: 'Drifting',
                                value: 'drift',
                                selected: false
                            },
                            {
                                label: 'Rally',
                                value: 'rally',
                                selected: false
                            },
                        ],
                        required: false
                    },
                    {
                        label: 'Did you know that Donut has a store?',
                        id: 'storeKnowledge',
                        type: 'radio',
                        options: ['Yes', 'No'],
                        value: '',
                        required: false
                    },
                    {
                        label: 'Do you have any other feedback for us?',
                        id: 'feedback',
                        type: 'textarea',
                        value: '',
                        required: false
                    },
                ],
                primaryColor: '#fcd510',
                secondaryColor: '#42b35a'
            }
        }
    }
}
</script>
