import React from 'react';
import '../../App.css';
import bottle from '../../icons/milk-bottle.svg';
import sleep from '../../icons/sleeping.svg';
import todo from '../../icons/diary.svg';
import RelieveModal from '../relieve/RelieveModal';
import EatingModal from '../eating/EatingModal';
import RelieveInfo from '../relieve/RelieveInfo';
import EatingInfo from '../eating/EatingInfo';
import SleepingModal from '../sleeping/SleepingModal';
import SleepingInfo from '../sleeping/SleepingInfo';
import ToDoModal from '../todo/ToDoModal';
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