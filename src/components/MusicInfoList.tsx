import { useEffect, useState } from "react";
import type { MusicInfoItem } from "../types/music/getAllMusicInfo";
import { musicService } from "../services/musicServices";

export default function MusicInfoList() {
    const [musicInfoList, setMusicInfoList] = useState<MusicInfoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMusicInfo = async () => {
            setLoading(true);
            try {
                const response = await musicService.getAllMusicInfo({});
                if (response.code !== 200) {
                    setError('获取音乐信息失败: ' + response.errors?.join() || '未知错误');
                    setMusicInfoList([]);
                    return;
                }
                setMusicInfoList(response.data || []);
            }
            catch (err) {
                setError('获取音乐信息异常: ' + (err as Error).message);
                setMusicInfoList([]);
            }
            finally {
                setLoading(false);
            }
        };
        getMusicInfo();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <table border={1} cellPadding={5} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>艺术家</th>
                        <th>专辑</th>
                    </tr>
                </thead>
                <tbody>
                    {musicInfoList.map(musicInfo => (
                        <tr key={musicInfo.id}>
                            <td>{musicInfo.title}</td>
                            <td>{musicInfo.artist}</td>
                            <td>{musicInfo.album}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}