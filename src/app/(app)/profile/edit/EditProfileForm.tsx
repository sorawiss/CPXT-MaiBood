"use client"

import { useFormState } from 'react-dom';
import { State, updateUser } from './actions';
import Input from '@/components/Input';
import TitleHeader from '@/components/TitleHeader';
import { User } from '@prisma/client';
import Button from '@/components/Button';
import { useEffect, useRef } from 'react';

function EditProfileForm({ user }: { user: User }) {
    const initialState: State = { message: null };
    const updateUserWithId = updateUser.bind(null, user.id);
    const [state, dispatch] = useFormState(updateUserWithId, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message?.includes("Updated")) {
            alert(state.message);
            formRef.current?.reset();
        } else if (state.message) {
            alert(state.message);
        }
    }, [state]);


    return (
        <div className='flex flex-col h-full w-full p-[2rem] ' >
            <TitleHeader title="Edit Profile" />

            <form ref={formRef} action={dispatch} className='flex flex-col gap-[1rem] ' >
                <Input
                    name="name"
                    label='Name'
                    type='text'
                    defaultValue={user.name}
                    placeholder='Your name'
                />
                <Input
                    name="phone_number"
                    label='Phone Number'
                    type='text'
                    defaultValue={user.phone_number}
                    placeholder='Your phone number'
                />
                <Input
                    name="line"
                    label='Line'
                    type='text'
                    defaultValue={user.line ?? ''}
                    placeholder='Your Line ID'
                />
                <Input
                    name="facebook"
                    label='Facebook'
                    type='text'
                    defaultValue={user.facebook ?? ''}
                    placeholder='Your Facebook'
                />
                <Input
                    name="instagram"
                    label='Instagram'
                    type='text'
                    defaultValue={user.instagram ?? ''}
                    placeholder='Your Instagram'
                />
                <Button type="submit" className='mt-[2rem] ' text='Update' />
            </form>
        </div>
    )
}
export default EditProfileForm 