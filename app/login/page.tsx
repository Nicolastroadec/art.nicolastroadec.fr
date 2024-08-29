'use client';

import { useActionState } from 'react';
import { authenticate } from '../../app/(lib)/action';

export default function page() {

    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (<form action={formAction} className="flex justify-center items-center h-lvh w-full flex-col">
        <label htmlFor="email">Utilisateur</label>
        <input className="rounded-xl border-solid border-gray-400 p-2 border-2 text-black mb-4" type="email" id="email" name="email" required />
        <label htmlFor="password">Mot de passe</label>
        <input className="rounded-xl border-solid border-gray-400 p-2 border-2 text-black mb-10" type="password" id="password" name="password"
            minLength={6} required />
        <input aria-disabled={isPending} type="submit" className="text-white bg-gray-800 px-4 py-2 hover:bg-gray-600" value="Connexion" />
        {errorMessage && (
            <>
                <p className="text-sm text-red-500">{errorMessage}</p>
            </>
        )}
    </form>)
}
