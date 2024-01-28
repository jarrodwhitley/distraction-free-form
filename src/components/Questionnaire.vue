<template>
    <div class="questionnaire">
        <div class="questionnaire__header" :style="'background-color:' + data.primaryColor">
            <img class="questionnaire__header__logo h-full w-auto" :src="data.logo" alt="client logo"/>
        </div>
        <div class="questionnaire__intro h-screen flex flex-col justify-content-center align-items-center">
            <h1 class="questionnaire__intro__title" v-text="data.intro.title"></h1>
            <p class="questionnaire__intro__text" v-text="data.intro.text"></p>
        </div>
        <form class="questionnaire__form">
            <div class="questionnaire__form__field h-screen w-screen"
                 v-for="field in data.fields">
                <label :for="field.id">{{ field.label }}
                    <input :id="field.id"/>
                </label>
            </div>
        </form>
        <div class="questionnaire__footer" :style="'background-color:' + data.secondaryColor">

        </div>
    </div>
</template>

<script>
export default {
    name: 'Questionnaire',
    props: {
        clientData: Array
    },
    data() {
        return {
            data: this.clientData,

        }
    }
}
</script>
