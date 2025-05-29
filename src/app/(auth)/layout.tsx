//認証関連レイアウトページ

export default function AuthLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
  return (
    <div className="min-h-screen flex item-center justify-center p-4">
        {children}
    </div>
  )
}