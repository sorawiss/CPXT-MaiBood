import NavBar from "@/components/NavBar"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  )
}
export default Layout