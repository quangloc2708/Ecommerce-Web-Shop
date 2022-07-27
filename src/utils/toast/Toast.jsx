import { useCallback, useEffect } from 'react';

const Toast = ({ toastlist, animation, setList }) => {
    const deleteToast = useCallback(
        (id) => {
            const toastListItem = toastlist.filter((e) => e.id !== id);
            setList(toastListItem);
        },
        [toastlist, setList],
    );

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastlist.length) {
                deleteToast(toastlist[0].id);
            }
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [toastlist, deleteToast]);
    return (
        <div id="toast">
            {toastlist.map((toast, index) => (
                <div key={index} className={`toast ${animation}`} style={{ borderColor: toast.color }}>
                    <div className="toast__icon">
                        <i className={toast.icon}></i>
                    </div>
                    <div className="toast__body">
                        <h3 className="toast__title">{toast.title}</h3>
                        <p className="toast__msg">{toast.description}</p>
                    </div>
                    <div className="toast__close" onClick={() => deleteToast(toast.id)}>
                        <i className="bx bx-x"></i>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Toast;
