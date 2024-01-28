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
                intro: {
                    title: 'Welcome to Donut!',
                    text: 'Firstly, thank you for taking the time to fill out this questionnaire. Your answer here will help us to craft our future content to your liking. As you already know, we love everything involving cars, but what you may not know is how much we love our fans! Getting to know the people who have made our channel a success has been a great joy. Thank again for your time, we look forward to hearing from you!',
                    ctaText: 'Start'
                },
                fields: [
                    {
                        label: 'First Name',
                        id: 'fname',
                        type: 'text'
                    },
                    {
                        label: 'Last Name',
                        id: 'lname',
                        type: 'text'
                    },
                    {
                        label: 'Email',
                        id: 'email',
                        type: 'text'
                    },
                    {
                        label: 'What is your favorite color?',
                        id: 'color',
                        type: 'text'
                    },
                    {
                      label: 'What is your favorite kind of Donut video?',
                      id: 'favoriteVideo',
                      type: 'select',
                      options: [
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
                      ]
                    },
                ],
                primaryColor: '#fcd510',
                secondaryColor: '#42b35a'
            }
        }
    }
}
</script>
