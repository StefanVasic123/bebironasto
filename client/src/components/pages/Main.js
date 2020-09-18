import React from 'react';
import '../../App.css';
import bottle from '../../icons/milk-bottle.svg';
import sleep from '../../icons/sleeping.svg';
import todo from '../../icons/diary.svg';
import RelieveModal from '../main/relieve/RelieveModal';
import EatingModal from '../main/eating/EatingModal';
import RelieveInfo from '../main/relieve/RelieveInfo';
import EatingInfo from '../main/eating/EatingInfo';
import SleepingModal from '../main/sleeping/SleepingModal';
import SleepingInfo from '../main/sleeping/SleepingInfo';
import ToDoModal from '../main/todo/ToDoModal';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const Main = () => {
    return (
        <div className="main-section">
            <div className="row">
                <div className="row-img">
                <ToastProvider>
                    <EatingModal />
                </ToastProvider>
                </div>
                <div className="row-txt">
                    <p>Ruckanje</p>
                </div>
            </div>
            <div className="row">
                <div className="row-img">
                <ToastProvider>
                    <RelieveModal />
                </ToastProvider>
                </div>
                <div className="row-txt">
                    <p>Ukakanko</p>
                </div>
            </div>
            <div className="row">
                <div className="row-img">
                <ToastProvider>
                    <SleepingModal />
                </ToastProvider>
                </div>
                <div className="row-txt">
                    <p>Spavkanje</p>
                </div>
            </div>
            <div className="row">
                <div className="row-img">
                        <ToDoModal />
                </div>
                <div className="row-txt">
                    <p>Podsetnik</p>
                </div>
            </div>
                         
             {/*
            <EatingInfo />
            <SleepingInfo />
                        */}

        </div>
    );
};

export default Main;