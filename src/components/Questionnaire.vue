<template>
    <div class="questionnaire overflow-hidden relative dark:bg-slate-800">
        <div class="questionnaire__header flex flex-col items-center justify-center z-20 fixed top-0 left-0 w-full h-10 md:h-20" :style="'background-color:' + data.primaryColor">
            <img class="questionnaire__header__logo h-full w-auto" :src="data.logo" alt="client logo"/>
            <div class="dark-mode-slide-toggle absolute right-2 cursor-pointer">
                <label for="darkmode">
                    <input type="checkbox" id="darkmode" v-model="darkMode" class="hidden"/>
                    <div class="toggle-bg flex justify-evenly items-center bg-gray-600 rounded-2xl w-14 h-7 relative" :class="{ 'dark' : darkMode }">
                        <i class="fas fa-sun text-gray-400"></i>
                        <i class="fas fa-moon text-gray-400"></i>
                    </div>
                </label>
            </div>
            <div class="questionnaire__progress w-screen bg-slate-100" :class="{ 'opacity-0' : !formBegin }">
                <div class="questionnaire__progress__bar h-1 bg-slate-800 dark:bg-green-400" :style="'width:' + ((currentField + 1) / data.fields.length) * 100 + '%'"></div>
            </div>
        </div>
        <Transition name="questionnaire__intro__transition" tag="div">
            <div class="questionnaire__intro h-auto md:h-screen w-auto flex flex-col md:grid grid-rows-2 md:grid-rows-1 grid-cols-2 justify-center items-center mt-20 md:mt-auto z-10 gap-5" v-show="!formBegin">
                <img class="questionnaire__intro__image hidden md:block z-0 object-cover pointer-events-none h-1/4 md:h-full row-start-1 col-span-full md:col-span-1 md:col-start-1" :src="data.background" alt="client background"/>
                <div class="flex flex-col w-full px-10 md:pl-10 md:pr-28 gap-10 row-start-2 md:row-start-1 col-span-full md:col-span-1 md:col-start-2">
                    <h1 class="questionnaire__intro__title text-4xl md:text-6xl font-bold dark:text-white" v-text="data.intro.title"></h1>
                    <p class="questionnaire__intro__text leading-7 dark:text-white" v-text="data.intro.text"></p>
                    <div class="flex flex-row items-center w-fit mx-auto md:mx-px gap-2">
                        <button class="questionnaire__intro__cta btn-primary justify-self-center" v-text="data.intro.ctaText" @click="launchForm"></button>
                        <div class="text-slate-800 dark:text-white text-xs hidden md:block">press <strong>Enter ↵</strong></div>
                    </div>
                </div>
            </div>
        </Transition>
        <form class="questionnaire__form grid grid-cols-1 grid-rows-1 items-center justify-items-center z-10 select-none" v-show="formBegin">
            <div class="questionnaire__form__field flex flex-col items-start caret-slate-800 dark:caret-white mt-20 md:mt-auto justify-start md:justify-center h-screen px-10 w-full md:max-w-screen-md row-start-1 col-start-1 gap-5"
                 :class="animationClass(index)"
                 v-for="(field, index) in data.fields">
                <label class="flex flex-col text-2xl text-slate-800 dark:text-white gap-5 w-full" :for="field.id">{{ field.label }}
                    <input v-if="field.type === 'text'"
                           :type="field.type"
                           :id="field.id"
                           placeholder="Type here..."
                           v-model="field.value"
                           class="questionnaire__form__field--input bg-white pb-2 border-b-2 capitalize dark:bg-transparent"/>
                    <input v-if="field.type === 'email'"
                           :type="field.type"
                           :id="field.id"
                           placeholder="Type here..."
                           v-model="field.value"
                           class="questionnaire__form__field--email bg-white pb-2 border-b-2 dark:bg-transparent"/>
                    <textarea v-if="field.type === 'textarea'"
                              :id="field.id"
                              placeholder="Type here..."
                              v-model="field.value"
                              class="questionnaire__form__field--email bg-white h-14 pb-2 border-b-2 dark:bg-transparent"/>
                    <select v-if="field.type === 'select'"
                            :id="field.id"
                            v-model="field.value"
                            class="questionnaire__form__field--select text-xl py-2 px-1 bg-slate-100 cursor-pointer dark:text-slate-800 dark:bg-slate-200">
                        <option class="text-base"
                                v-for="(option, index) in field.options"
                                :disabled="index === 0"
                                :value="option.value"
                                v-text="option.label"></option>
                    </select>
                    <span v-if="field.type === 'radio'" class="questionnaire__form__field--radio flex flex-col md:flex-row justify-start items-start gap-10 py-5">
                        <label v-for="option in field.options" :for="field.id + option" class="text-base flex flex-row-reverse items-center justify-start cursor-pointer gap-2">{{ option }}
                            <input class="hidden pointer-events-none"
                                   :value="option"
                                   v-model="field.value"
                                   :name="field.id"
                                   :type="field.type"
                                   :id="field.id + option"/>
                            <span class="questionnaire__form__field--radio__checkmark rounded-full bg-slate-200 dark:bg-slate-100 h-5 w-5"></span>
                        </label>
                    </span>
                    <span v-if="field.type === 'checkbox'" class="questionnaire__form__field--radio flex flex-col md:flex-row justify-start items-start gap-10 py-5">
                        <label v-for="option in field.options" :for="field.id + option.label" class="text-base flex flex-row-reverse items-center justify-start cursor-pointer gap-2">{{ option.label }}
                            <input class="hidden pointer-events-none"
                                   :value="option.label"
                                   v-model="option.selected"
                                   :name="field.id + option.value"
                                   :type="field.type"
                                   :id="field.id + option.label"/>
                            <span class="questionnaire__form__field--radio__checkmark rounded-full bg-slate-200 dark:bg-slate-100 h-5 w-5"></span>
                        </label>
                    </span>
                    <VueDatePicker class="questionnaire__datepicker"
                                   v-if="field.type === 'datepicker'"
                                   v-model="field.value"
                                   @open="datePickerOpen = true"
                                   @closed="datePickerOpen = false"
                                   :enable-time-picker="false"></VueDatePicker>
                </label>
                <div class="flex flex-row items-center gap-2">
                    <div v-if="index !== data.fields.length - 1" class="questionnaire__form__field__next-btn btn-secondary" @click="nextField">Next</div>
                    <div v-else class="questionnaire__form__field__next-btn btn-secondary" @click="submit">Submit</div>
                    <div v-if="index !== data.fields.length - 1" class="text-slate-800 dark:text-white text-xs hidden md:block">press <strong>Enter ↵</strong></div>
                </div>
            </div>
        </form>
        <div class="questionnaire__nav-arrows fixed bottom-10 lg:bottom-auto lg:top-2/4 right-8 text-4xl" v-show="formBegin">
            <div class="questionnaire__nav-arrows__arrow cursor-pointer active:bg-slate-300 dark:active:bg-slate-600 hover:md:bg-slate-200 dark:hover:md:bg-slate-600 px-1 rounded" @click="prevField">
                <i class="fas fa-chevron-up text-slate-800 dark:text-white"></i>
            </div>
            <div class="questionnaire__nav-arrows__arrow cursor-pointer active:bg-slate-300 dark:active:bg-slate-600 hover:md:bg-slate-200 dark:hover:md:bg-slate-600 px-1 rounded" @click="nextField">
                <i class="fas fa-chevron-down text-slate-800 dark:text-white"></i>
            </div>
        </div>
        <div class="questionnaire__footer h-6 text-white text-sm flex items-center justify-end pr-2 bg-slate-800 dark:bg-slate-900 fixed bottom-0 left-0 right-0 z-0 select-none" v-text="data.copyright">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Questionnaire',
    props: {
        clientData: Array
    },
    mounted() {
        window.addEventListener('wheel', (e) => {
            if (this.datePickerOpen) return false;
            if (this.scrollAnimationComplete && this.formBegin && e.deltaY > 0) {
                this.nextField();
            } else {
                this.prevField();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (!this.formBegin) {
                    this.launchForm();
                } else {
                    this.nextField();
                }
            }

            // if tab is pressed, prevent default
            if (e.key === 'Tab') {
                e.preventDefault();
            }
        });
    },
    data() {
        return {
            data: this.clientData,
            currentField: 0,
            formBegin: false,
            userInteraction: false,
            scrollDirection: '',
            formScrollInitiated: false,
            scrollAnimationComplete: true,
            datePickerOpen: false,
            darkMode: false
        }
    },
    methods: {
        scrollAnimationHandler() {
            this.scrollAnimationComplete = false;
            setTimeout(() => {
                this.scrollAnimationComplete = true;
            }, 1000);
        },
        launchForm() {
            this.formBegin = true;
            this.scrollAnimationHandler();
            this.focusCurrentField();
        },
        nextField() {
            if (!this.scrollAnimationComplete) return false;
            this.formScrollInitiated = true;
            this.scrollDirection = 'down';
            if (this.currentField !== this.data.fields.length - 1) {
                this.currentField++;
            }
            this.scrollAnimationHandler();
        },
        prevField() {
            if (!this.scrollAnimationComplete) return false;
            this.scrollDirection = 'up';
            if (this.currentField !== 0) {
                this.currentField--;
            }
            this.scrollAnimationHandler();
        },
        animationClass(index) {
            let classes = [];

            if (!this.formScrollInitiated && index === 0) {
                classes.push('animate__animated animate__fadeInUp');
            } else if (!this.formScrollInitiated && index > 0) {
                classes.push('opacity-0 pointer-events-none');
            } else {
                classes.push('animate__animated');
            }

            if (index < this.currentField) {
                classes.push('animate__fadeOutUp');
            } else if (index > this.currentField) {
                classes.push('animate__fadeOutDown');
            } else if (this.scrollDirection === 'down') {
                classes.push('animate__fadeInUp');
            } else if (this.scrollDirection === 'up') {
                classes.push('animate__fadeInDown');
            }

            return classes.join(' ');
        },
        focusCurrentField() {
            const currentField = this.$el.querySelector(`#${this.data.fields[this.currentField].id}`);
            setTimeout(() => {
                currentField.focus();
            }, 1000);
        },
        submit() {
            alert('Form submitted!');
        }
    },
    watch: {
        currentField(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.focusCurrentField();
            }
        },
        darkMode(newVal, oldVal) {
            if (newVal !== oldVal) {
                document.querySelector('html').classList.toggle('dark');
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/questionnaire';
</style>
