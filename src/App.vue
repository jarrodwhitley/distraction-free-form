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
                background: 'https://donut.media/cdn/shop/files/jan_web_header.png?v=1705685702',
                intro: {
                    title: 'Welcome to Donut!',
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
                        label: 'What state are you from?',
                        id: 'state',
                        type: 'text',
                        value: '',
                        required: false
                    },
                    {
                        label: 'What is your favorite color?',
                        id: 'color',
                        type: 'text',
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
                        label: 'Do you enjoy clicking on buttons?',
                        id: 'buttonPreference',
                        type: 'checkbox',
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
                        label: 'How often to you watch Donut?',
                        id: 'watchFrequency',
                        type: 'radio',
                        value: '',
                        options: ['Daily', 'Almost Daily', 'Weekly', 'Monthly'],
                        required: false
                    },
                    {
                        label: 'Did you know that Donut has a store?',
                        id: 'storeKnowledge',
                        type: 'radio',
                        value: '',
                        required: false
                    }

                ],
                primaryColor: '#fcd510',
                secondaryColor: '#42b35a'
            }
        }
    }
}
</script>
