import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword({ email }, role));
        setEmail("");
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
    }, [dispatch, error, message, enqueueSnackbar]);


    return (
        <>
            <MetaData title="Access Recovery | Quick Buy" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
                    <div className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_40px_100px_rgba(15,82,186,0.1)] border border-blue-50 overflow-hidden p-10 md:p-16 transition-all duration-700">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-blue-600 shadow-2xl shadow-blue-600/30 mb-8 group overflow-hidden">
                                <span className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">🔐</span>
                            </div>
                            <h1 className="text-3xl font-black text-blue-950 tracking-tighter uppercase leading-none mb-4">Recover <span className="text-blue-600">Access</span></h1>
                            <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.3em]">Institutional Credential Recovery</p>
                        </div>

                        <div className="flex justify-center mb-8">
                            <ToggleButtonGroup
                                color="primary"
                                value={role}
                                exclusive
                                onChange={(e, newRole) => { if (newRole) setRole(newRole); }}
                                aria-label="Account Type"
                                sx={{
                                    '& .MuiToggleButton-root': {
                                        borderRadius: '1rem',
                                        px: 4,
                                        py: 1,
                                        fontWeight: '800',
                                        fontSize: '10px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em'
                                    }
                                }}
                            >
                                <ToggleButton value="user">
                                    <PersonIcon sx={{ mr: 1, fontSize: 'large' }} /> User
                                </ToggleButton>
                                <ToggleButton value="seller">
                                    <StorefrontIcon sx={{ mr: 1, fontSize: 'large' }} /> Seller
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <TextField
                                fullWidth
                                label="Registered Endpoint (Email)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '1.5rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '700' },
                                    '& .MuiInputLabel-root': { fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }
                                }}
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl shadow-blue-600/30 hover:bg-blue-800 hover:-translate-y-2 transition-all duration-700 active:scale-95"
                            >
                                {loading ? 'Processing Protocol...' : 'Initiate Recovery Link'}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-blue-50 text-center">
                            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-black text-[10px] uppercase tracking-[0.2em] transition-all border-b border-blue-600/20 pb-1">
                                Return to Access Gateway
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ForgotPassword