import { useState } from 'react';
import { addWish } from '@/lib/wishes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export function WishForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const fireConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ['#C41E3A', '#FFD700', '#FF6B35', '#E8000D', '#FFA500'];

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
                colors,
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        // Big burst first
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors,
        });

        frame();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        // Rate limiting check
        const lastWishTime = localStorage.getItem('lastWishTime');
        if (lastWishTime) {
            const timeDiff = Date.now() - parseInt(lastWishTime);
            if (timeDiff < 60000) { // 60 seconds
                const remaining = Math.ceil((60000 - timeDiff) / 1000);
                toast.error(`Bạn gửi nhanh quá! Vui lòng đợi ${remaining} giây nữa nhé.`);
                return;
            }
        }

        setSending(true);
        try {
            await addWish(name.trim(), message.trim());

            // Update last wish time
            localStorage.setItem('lastWishTime', Date.now().toString());

            fireConfetti();
            setSent(true);
            setName('');
            setMessage('');
            setTimeout(() => setSent(false), 3000);
            toast.success('Gửi lời chúc thành công!');
        } catch (error) {
            console.error('Error sending wish:', error);
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="wish-form-panel">
            <div className="panel-header">
                <h2 className="panel-title">Gửi lời nhắn tới tớ</h2>
            </div>

            <div className="form-decoration">
                <div className="year-display">
                    <span className="year-number">2026</span>
                    <span className="year-animal">Happy New Year</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="wish-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Tên của cậu
                    </label>
                    <Input
                        id="name"
                        placeholder="Nhập tên..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        maxLength={50}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message" className="form-label">
                        Lời cậu muốn nói
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Viết lời chúc năm mới..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-textarea"
                        rows={5}
                        maxLength={500}
                        required
                    />
                    <span className="char-count">{message.length}/500</span>
                </div>

                <Button
                    type="submit"
                    disabled={sending || !name.trim() || !message.trim()}
                    className="submit-btn"
                >
                    {sending ? (
                        <>
                            <span className="loading-spinner small" /> Đang gửi...
                        </>
                    ) : sent ? (
                        'Đã gửi thành công!'
                    ) : (
                        'Gửi Lời Chúc'
                    )}
                </Button>
            </form>

            <div className="form-footer">
                <p className="footer-text">
                    Send me anything you wanna say that we haven't have chance to say. Wish we all happy new year !!!
                </p>
            </div>
        </div>
    );
}
