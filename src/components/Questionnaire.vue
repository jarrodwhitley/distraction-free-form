<template>
    <div class="questionnaire overflow-hidden relative h-screen dark:bg-slate-800" v-if="data">
        <div class="questionnaire__header flex flex-col items-center justify-center z-20 fixed top-0 left-0 w-full h-10 md:h-20" :style="'background-color:' + data.primaryColor">
            <img class="questionnaire__header__logo h-full w-auto" :src="data.logo" alt="client logo"/>
            <div class="dark-mode-slide-toggle absolute right-2">
                <label for="darkmode">
                    <input type="checkbox" id="darkmode" v-model="darkMode" class="hidden"/>
                    <div class="toggle-bg flex justify-evenly items-center bg-gray-600 rounded-2xl w-14 h-7 cursor-pointer relative" :class="{ 'dark' : darkMode }">
                        <i class="fas fa-sun text-gray-400"></i>
                        <i class="fas fa-moon text-gray-400"></i>
                    </div>
                </label>
            </div>
            <div class="questionnaire__progress w-screen bg-slate-100" :class="{ 'opacity-0' : !formBegin }">
                <div class="questionnaire__progress__bar h-1 bg-slate-800 dark:bg-green-400" :style="'width:' + ((currentField + 1) / data.fields.length) * 100 + '%'"></div>
            </div>
        </div>
        <div class="questionnaire__loading-overlay flex flex-col items-center justify-center z-10 fixed top-0 left-0 w-full h-screen bg-white" :class="{ 'show-overlay' : loading }">
            <svg class="h-24 w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm32-256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-16.1 62l0 65c44.3-5.5 81.5-33.6 99.8-72.4l-61.9-20.1c-8.6 13.5-22.1 23.5-38 27.6zm47.9-58l61.8 20.1c1.5-7.8 2.3-15.9 2.3-24.2c0-36.8-15.5-69.9-40.3-93.3l-38.2 52.6c9.1 11 14.5 25.2 14.5 40.6c0 1.4 0 2.7-.1 4zm-40.2-63.5l38.2-52.6C299.5 133.8 278.4 128 256 128s-43.5 5.8-61.8 15.9l28.1 38.8 10 13.8c7.3-2.9 15.3-4.5 23.6-4.5s16.3 1.6 23.6 4.5zM168.3 162.7C143.5 186.1 128 219.2 128 256c0 8.3 .8 16.3 2.3 24.2L192.1 260c-.1-1.3-.1-2.7-.1-4c0-15.4 5.5-29.6 14.5-40.6l-10.1-13.9-28.1-38.7zm33.7 127.7l-61.9 20.1c18.3 38.8 55.5 66.9 99.8 72.4l0-65c-15.8-4.1-29.3-14.1-37.9-27.5zM256 96a160 160 0 1 1 0 320 160 160 0 1 1 0-320z"/></svg>
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
    data() {
        return {
            data: null,
            currentField: 0,
            formBegin: false,
            userInteraction: false,
            scrollDirection: '',
            formScrollInitiated: false,
            scrollAnimationComplete: true,
            datePickerOpen: false,
            darkMode: false,
            loading: true
        }
    },
    mounted() {
        this.data = this.clientData;
        this.getLocalStorage();
        window.addEventListener('load', () => {
            this.loading = false;
        });
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
        setLocalStorage() {
            localStorage.setItem('formData', JSON.stringify(this.formData));
        },
        getLocalStorage() {
            let storedData = JSON.parse(localStorage.getItem('formData'));
            this.assignStoredData(storedData);
        },
        assignStoredData(storedData) {
            if (storedData == null) return false;
            this.data.fields = this.data.fields.map(field => {
                field.value = storedData[field.id];
                return field;
            });
        },
        submit() {
            alert('Form submitted!');
        }
    },
    computed: {
        formData: {
            get() {
                if (this.data == null) return false;
                return this.data.fields.reduce((acc, field) => {
                    acc[field.id] = field.value;
                    return acc;
                }, {});
            },
            set(formData) {
                if (this.data == null) return false;
                this.data.fields = this.data.fields.map(field => {
                    field.value = formData[field.id];
                    return field;
                });
            }
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
        },
        formData: {
            handler(newVal, oldVal) {
                this.setLocalStorage();
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/questionnaire';
</style>
