<template>
    <div id="app">
        <Questionnaire :client-data="clientData"/>
    </div>
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
                    text: 'Thank you for taking the time to fill out this questionnaire. We look forward to getting to know what makes you tick!',
                    ctaText: 'Start'
                },
                fields: [
                    {
                        label: 'First Name',
                        id: 'fname',
                    },
                    {
                        label: 'Last Name',
                        id: 'lname',
                    },
                    {
                        label: 'Email',
                        id: 'email',
                    },
                    {
                        label: 'What is your favorite color?',
                        id: 'color',
                    }
                ],
                primaryColor: '#fcd510',
                secondaryColor: '#E5202A'
            }
        }
    }
}
</script>
