import { useEffect, useState } from 'react';
import { subscribeToWishes, type Wish } from '@/lib/wishes';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WishList() {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToWishes((newWishes) => {
            setWishes(newWishes);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const formatTime = (timestamp: Wish['createdAt']) => {
        if (!timestamp) return 'Vừa xong';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    if (loading) {
        return (
            <div className="wish-list-panel">
                <div className="panel-header">
                    <h2 className="panel-title">Lời Chúc Tết</h2>
                </div>
                <div className="wish-loading">
                    <div className="loading-spinner" />
                    <p>Đang tải lời chúc...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="wish-list-panel">
            <div className="panel-header">
                <h2 className="panel-title">Lời Chúc Tết</h2>
                <span className="wish-count">{wishes.length} lời chúc</span>
            </div>

            <ScrollArea className="wish-scroll-area">
                {wishes.length === 0 ? (
                    <div className="wish-empty">
                        <span className="empty-icon">—</span>
                        <p>Chưa có lời chúc nào.</p>
                        <p className="empty-sub">Hãy là người đầu tiên gửi lời chúc Tết!</p>
                    </div>
                ) : (
                    <div className="wish-list">
                        {wishes.map((wish, index) => (
                            <div
                                key={wish.id}
                                className="wish-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="wish-card-header">
                                    <span className="wish-author">{wish.name}</span>
                                    <span className="wish-time">{formatTime(wish.createdAt)}</span>
                                </div>
                                <p className="wish-message">{wish.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
