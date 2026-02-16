import { useState } from 'react';
import { addWish } from '@/lib/wishes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import confetti from 'canvas-confetti';

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

        setSending(true);
        try {
            await addWish(name.trim(), message.trim());
            fireConfetti();
            setSent(true);
            setName('');
            setMessage('');
            setTimeout(() => setSent(false), 3000);
        } catch (error) {
            console.error('Error sending wish:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="wish-form-panel">
            <div className="panel-header">
                <h2 className="panel-title">Gửi Lời Chúc</h2>
            </div>

            <div className="form-decoration">
                <div className="year-display">
                    <span className="year-number">2026</span>
                    <span className="year-animal">Năm Bính Ngọ</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="wish-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Tên của bạn
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
                        Lời chúc Tết
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
                    Mỗi lời chúc đều mang đến may mắn và hạnh phúc
                </p>
            </div>
        </div>
    );
}
